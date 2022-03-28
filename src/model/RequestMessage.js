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
  constructor(requestId, source, version, name, payload, chunks, currentChunk) {
    this.name = name;
    this.request_id = requestId;
    this.source = source;
    this.version = version;
    this.payload = payload;
    this.chunks = chunks || 1;
    this.chunk = currentChunk || 0;
  }

  get requestId() {
    return this.response_id;
  }

  set requestId(value) {
    this.response_id = value;
  }

  get isChunked() {
    return this.chunks > 1;
  }

  get currentChunk() {
    return this.chunk;
  }

  static build(data) {
    if (data.name && data.request_id && data.source && data.version && data.payload) {
      return new RequestMessage(
        data.request_id,
        data.source,
        data.version,
        data.name,
        data.payload,
        data.chunks,
        data.chunk,
      );
    }
    return null;
  }
}
