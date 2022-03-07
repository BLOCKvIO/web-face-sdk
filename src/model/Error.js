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
export default class Error {
  constructor(errorCode, errorMessage) {
    this.error_code = errorCode;
    this.error_message = errorMessage;
  }

  get code() {
    return this.error_code;
  }

  set code(value) {
    this.error_code = value;
  }

  get message() {
    return this.error_message;
  }

  set message(value) {
    this.error_message = value;
  }

  static build(data) {
    if (data.error_code && data.error_message) {
      return new Error(data.error_code, data.error_message);
    }
    return null;
  }
}

Error.Errors = {
  NOT_IN_VIEWER: new Error('not_in_viewer', 'BLOCKv Bridge: Not in a viewer!'),
  INIT_REQUIRED: new Error(
    'init_required',
    'Blockv.init must be complete before using this function.',
  ),
  INVALID_VIEWER_MESSAGE: new Error(
    'invalid_viewer_message',
    'The viewer message is in an unsupported format.',
  ),
  INVALID_PAYLOAD: new Error('invalid_payload', 'The message payload is in invalid.'),
  MISSING_VIEWER_PREFIX: new Error(
    'missing_view_prefix',
    'Custom message names require to be prefix with "viewer."',
  ),
  MESSAGE_NAME_NULL: new Error('message_name_null', "Custom message names can't be null."),
  INVALID_PARAMS: new Error('invalid_params', 'Provided function params are incorrect'),
};
