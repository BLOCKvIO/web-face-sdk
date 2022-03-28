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

const CHUNK_SIZE = 5000;
class Bridge {
  constructor() {
    this.messageId = 0;
    this.messages = {};
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on('message', this.onReceiveMessage.bind(this));
    window.blockvEventReceiver = this.eventEmitter;
    // Add listener for events from host iframe
    window.addEventListener(
      'message',
      (event) => {
        this.onReceiveMessage(event.data.name, event.data);
      },
      false,
    );
  }

  onReceiveMessage(name, data) {
    const message = ResponseMessage.build(data) || RequestMessage.build(data) || null;

    if (message == null) return;
    if (message instanceof ResponseMessage) {
      if (this.messages[message.responseId] != null) {
        const handler = this.messages[message.responseId];
        if (!handler.next || !handler.next(message.currentChunk)) {
          delete this.messages[message.responseId];

          if (message.payload instanceof ErrorPayload) {
            handler.reject(message.payload);
          } else {
            handler.resolve(message.payload);
          }
        }
      }
    } else if (message instanceof RequestMessage) {
      // handle requests
      this.eventEmitter.emit(message.name, message);
    }
  }

  /** Send a success response to the viewer. This is used for requests initiated from the viewer side. */
  sendResponseSuccess(originalRequest, payload) {
    // Send message
    this.sendRaw({
      name: originalRequest.name,
      response_id: originalRequest.request_id,
      payload,
    });
  }

  /** Send a fail response to the viewer. This is used for requests initiated from the viewer side. */
  sendResponseFail(originalRequest, error) {
    // Send message
    this.sendRaw({
      name: originalRequest.name,
      response_id: originalRequest.request_id,
      payload: {
        error_message: error.message || 'There was a problem.',
        error_code: error.code || 'internal_error',
      },
    });
  }

  /** Send a large request to the viewer and return the response. @returns Promise */
  sendLargeMessage(name, payload) {
    let stringPayload = '';
    if (payload) {
      try {
        stringPayload = JSON.stringify(payload);
      } catch (error) {
        return Promise.reject(Error.Errors.INVALID_PAYLOAD);
      }
    }
    const chunks = Math.ceil(stringPayload.length / CHUNK_SIZE);
    if (chunks <= 1) {
      return this.sendMessage(name, payload);
    }

    // Generate a unique message ID
    const id = this.generateMessageId();
    // Create message payload
    const message = new RequestMessage(
      id,
      'blockv_face_sdk',
      '2.0.0',
      name,
      stringPayload.substring(0, CHUNK_SIZE),
      chunks,
      0,
    );

    // Send request
    this.sendRaw(message);

    // Create promise and store the resolve/reject callbacks for later
    return new Promise((resolve, reject) => {
      this.messages[id] = {
        next: (chunk) => {
          console.log(chunk);
          if (chunks > 1 && chunk < chunks) {
            const sizeRemaining = Math.min(CHUNK_SIZE, stringPayload.length - chunk * CHUNK_SIZE);
            const nextMessage = new RequestMessage(
              id,
              'blockv_face_sdk',
              '2.0.0',
              name,
              stringPayload.substring(chunk * CHUNK_SIZE, chunk * CHUNK_SIZE + sizeRemaining),
              chunks,
              chunk,
            );
            // Send request
            this.sendRaw(nextMessage);
            return true;
          }
          return false;
        },
        resolve,
        reject,
      };
    });
  }

  /** Send a request to the viewer and return the response. @returns Promise */
  sendMessage(name, payload) {
    // Generate a unique message ID
    const id = this.generateMessageId();

    // Create message payload
    const message = new RequestMessage(id, 'blockv_face_sdk', '2.0.0', name, payload || {});

    // Send request
    this.sendRaw(message);

    // Create promise and store the resolve/reject callbacks for later
    return new Promise((resolve, reject) => {
      this.messages[id] = { resolve, reject };
    });
  }

  /** @private Send a raw JSON message to the viewer */
  sendRaw(message) {
    // Send to the viewer in the manner required per platform
    if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.blockvBridge
    ) {
      // Send to iOS WKWebView handler
      window.webkit.messageHandlers.blockvBridge.postMessage(message);
    } else if (window.androidBridge) {
      // Send to Android handler
      window.androidBridge.onIncomingBridgeMessage(JSON.stringify(message));
    } else if (window.parent && window.parent !== window) {
      // Send to parent iframe in the web viewer
      window.parent.postMessage(message, '*');
    } else {
      // Not in a viewer, send generic event and then throw an error
      this.onReceiveMessage(
        new ResponseMessage(message.id, message.name, ErrorPayload.Errors.NOT_IN_VIEWER),
      );
      throw ErrorPayload.Errors.NOT_IN_VIEWER;
    }
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
