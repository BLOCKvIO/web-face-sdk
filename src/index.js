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
import Vatom from './model/VatomEmitter';
import Face from './model/Face';
import RequestMessage from './model/RequestMessage';

class Blockv {
  constructor() {
    Bridge.addRequestListener('core.vatom.update', (message) => {
      if (message instanceof RequestMessage) {
        const { vatom } = message.payload;
        if (this.internalVatom && vatom.id === this.internalVatom.id) {
          this.internalVatom.vatomData = vatom;
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
    return Bridge
      .sendMessage('core.init', {})
      .then((response) => {
        if (!response.vatom || !response.face) {
          throw Error.Errors.INVALID_PAYLOAD;
        } else {
          this.internalVatom = new Vatom(response.vatom);
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
}
export default new Blockv();
