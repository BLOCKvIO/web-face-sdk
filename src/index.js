/**
 * BlockV AG. Copyright (c) 2018, all rights reserved.
 *
 * Licensed under the BlockV SDK License (the "License"); you may not use this file or
 * the BlockV SDK except in compliance with the License accompanying it. Unless
 * required by applicable law or agreed to in writing, the BlockV SDK distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import VatomManager from './manager/VatomManager';
import UserManager from './manager/UserManager';
import ResourceManager from './manager/ResourceManager';
import Bridge from './internal/Bridge';
import Error from './model/Error';
import EmitterVatom from './model/VatomEmitter';
import Vatom from './model/Vatom';
import Face from './model/Face';
import RequestMessage from './model/RequestMessage';

class Blockv {
  constructor() {
    // Keeps track of request handlers
    this.requestHandlersAdded = {};

    Bridge.addRequestListener('core.vatom.update', (message) => {
      if (message instanceof RequestMessage) {
        const { vatom } = message.payload;
        if (this.internalVatom && vatom.id === this.internalVatom.id) {
          this.internalVatom.updateData(vatom);
        }
      }
    });

    Bridge.addRequestListener('core.vatom.children.update', (message) => {
      if (message instanceof RequestMessage) {
        const vatoms = message.payload.vatoms.map((vatom) => new Vatom(vatom));
        if (message.payload.id === this.internalVatom.id) {
          this.internalVatom.emitter.emit('children', vatoms);
        }
      }
    });
  }

  get vatomManager() {
    if (!this.internalVatom) throw Error.Errors.INIT_REQUIRED;
    if (!this.internalVatomManager) {
      this.internalVatomManager = new VatomManager(Bridge, this.internalVatom);
    }
    return this.internalVatomManager;
  }

  get userManager() {
    if (!this.internalVatom) throw Error.Errors.INIT_REQUIRED;
    if (!this.internalUserManager) {
      this.internalUserManager = new UserManager(Bridge);
    }
    return this.internalUserManager;
  }

  get resourceManager() {
    if (!this.internalVatom) throw Error.Errors.INIT_REQUIRED;
    if (!this.internalResourceManager) {
      this.internalResourceManager = new ResourceManager(Bridge);
    }
    return this.internalResourceManager;
  }

  init() {
    return Bridge.sendMessage('core.init', {}).then((response) => {
      if (!response.vatom || !response.face) {
        throw Error.Errors.INVALID_PAYLOAD;
      } else {
        this.internalVatom = new EmitterVatom(response.vatom, Bridge);
        this.interalFace = new Face(response.face);
      }
      return {
        vatom: this.internalVatom,
        face: this.interalFace,
      };
    });
  }

  get backingVatom() {
    if (!this.internalVatom) throw Error.Errors.INIT_REQUIRED;
    return this.internalVatom;
  }

  get backingFace() {
    if (!this.interalFace) throw Error.Errors.INIT_REQUIRED;
    return this.interalFace;
  }

  sendMessage(name, payload) {
    if (name == null) {
      return Promise.reject(Error.Errors.MESSAGE_NAME_NULL);
    }
    if (!name.startsWith('viewer.')) {
      return Promise.reject(Error.Errors.MISSING_VIEWER_PREFIX);
    }
    return Bridge.sendMessage(name, payload);
  }

  /**
   * Listen for custom messages from the viewer.
   *
   * @param {string} name The name of the custom request to listen for.
   * @param {function} listener Handler function. It will receive the request data, and the returned value will be sent back to the viewer as the response. Promise supported.
   */
  addRequestHandler(name, listener) {
    // Prevent custom listeners that don't use the correct prefix
    if (!name.startsWith('viewer.') && !name.startsWith('custom.'))
      throw new Error(
        'You can only listen for custom requests with the "viewer." or "custom." prefix.',
      );

    // Only one handler can be active at a time
    if (this.requestHandlersAdded[name])
      throw new Error(`There is already a handler for request name: ${name}`);
    this.requestHandlersAdded[name] = true;

    // Add listener
    Bridge.addRequestListener(name, (msg) => {
      // Call the listener, wait for promise to resolve
      Promise.resolve()
        .then(() => listener(msg.payload))
        .then((response) => {
          // Success, send response back to the viewer
          Bridge.sendResponseSuccess(msg, response);
        })
        .catch((err) => {
          // Failed, send response back to the viewer
          Bridge.sendResponseFail(msg, err);
        });
    });
  }

  /** Remove request handler for the specified named request */
  removeRequestHandler(name) {
    // Clear it
    this.requestHandlersAdded[name] = false;
    Bridge.eventEmitter.eventListeners[name] = [];
  }
}

export default new Blockv();
