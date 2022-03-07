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
export default class RequestMessage {
  constructor(requestId, source, version, name, payload) {
    this.name = name;
    this.request_id = requestId;
    this.source = source;
    this.version = version;
    this.payload = payload;
  }

  get requestId() {
    return this.response_id;
  }

  set requestId(value) {
    this.response_id = value;
  }

  static build(data) {
    if (data.name && data.request_id && data.source && data.version && data.payload) {
      return new RequestMessage(
        data.request_id,
        data.source,
        data.version,
        data.name,
        data.payload,
      );
    }
    return null;
  }
}
