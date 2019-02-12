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
import RequestMessage from '../model/RequestMessage';
import ResponseMessage from '../model/ResponseMessage';
import ErrorPayload from '../model/Error';
import EventEmitter from '../util/EventEmitter';

class Bridge {
  constructor() {
    this.messageId = 0;
    this.messages = {};
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on('message', this.onReceiveMessage.bind(this));
    window.blockvEventReceiver = this.eventEmitter;
    // Add listener for events from host iframe
    window.addEventListener('message', (event) => {
      this.onReceiveMessage(event.data.name, event.data);
    }, false);
  }

  onReceiveMessage(name, data) {
    const message = ResponseMessage.build(data) || RequestMessage.build(data) || null;

    if (message == null) return;
    if (message instanceof ResponseMessage) {
      if (this.messages[message.responseId] != null) {
        const handler = this.messages[message.responseId];
        delete this.messages[message.responseId];

        if (message.payload instanceof ErrorPayload) {
          handler.reject(message.payload);
        } else {
          handler.resolve(message.payload);
        }
      }
    } else if (message instanceof RequestMessage) {
      // handle requests
      this.eventEmitter.emit(message.name, message);
    }
  }

  sendMessage(name, payload) {
    const id = this.generateMessageId();
    return new Promise((resolve, reject) => {
      const message = new RequestMessage(id, 'blockv_face_sdk', '2.0.0', name, payload || {});
      this.messages[id] = { resolve: resolve, reject: reject };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.blockvBridge) {
        // Send to iOS WKWebView handler, if it exists
        window.webkit.messageHandlers.blockvBridge.postMessage(message);
      } else if (window.androidBridge) {
        // Send to Android handler, if it exists
        window.androidBridge.onIncomingBridgeMessage(JSON.stringify(message));
      } else if (window.parent && window.parent !== window) {
        // Send to parent iframe, if it exists
        window.parent.postMessage(message, '*');
      } else {
        this.onReceiveMessage(new ResponseMessage(id, name, ErrorPayload.Errors.NOT_IN_VIEWER));
      }
    });
  }

  addRequestListener(name, callback) {
    this.eventEmitter.on(name, callback);
  }

  removeRequestListener(name, callback) {
    this.eventEmitter.off(name, callback);
  }

  emitMessage(name, message) {
    this.eventEmitter.emit(name, message);
  }

  generateMessageId() {
    this.messageId += 1;
    return `msg_${this.messageId}`;
  }
}

export default new Bridge();
