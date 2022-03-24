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
import ErrorPayload from './Error';

export default class ResponseMessage {
  constructor(responseId, payload, chunks, currentChunk) {
    this.response_id = responseId;
    this.payload = payload;
    this.chunks = chunks || 1;
    this.chunk = currentChunk || 0;
  }

  get responseId() {
    return this.response_id;
  }

  set responseId(value) {
    this.response_id = value;
  }

  get isChunked() {
    return this.chunks > 1;
  }

  get currentChunk() {
    return this.chunk;
  }

  static build(data) {
    if (data.response_id) {
      return new ResponseMessage(
        data.response_id,
        ErrorPayload.build(data.payload || {}) || data.payload,
        data.chunks,
        data.chunk,
      );
    }
    return null;
  }
}
