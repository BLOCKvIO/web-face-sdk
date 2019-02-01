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
export default class EventSource {
  /** Adds an event listener */
  addListener(eventName, callback) {
    if (!callback) return;
    // Make sure event listener object exists
    this.eventListeners = this.eventListeners || {};
    // Make sure event listener array exists
    this.eventListeners[eventName] = this.eventListeners[eventName] || [];
    // Remove callback if already added
    this.removeListener(eventName, callback);
    // Add the callback
    this.eventListeners[eventName].push(callback);
  }

  removeListener(eventName, callback) {
    if (!callback) return;
    if (!this.eventListeners) return;
    if (!this.eventListeners[eventName]) return;

    this.eventListeners[eventName] = this.eventListeners[eventName].filter(listener => listener !== callback);
  }

  /** Synonyms */
  on(...args) {
    return this.addListener(...args);
  }

  off(...args) {
    this.removeListener(...args);
  }

  /** Triggers an event. Each argument after the first one will be passed to event listeners */
  emit(eventName, ...args) {
    // Get list of callbacks
    const callbacks = this.eventListeners[eventName] || [];

    // Call events
    callbacks.forEach((callback) => {
      // Call it
      callback.apply(this, args);
    });
  }

  /** Synonyms */
  trigger(...args) {
    return this.emit(...args);
  }

  static mixin(otherClass) {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in EventSource.prototype) {
      if (Object.prototype.hasOwnProperty.call(EventSource, prop)) {
        // eslint-disable-next-line no-param-reassign
        otherClass[prop] = EventSource.prototype[prop];
      }
    }
  }
}
