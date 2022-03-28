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
import Error from '../model/Error';

export default class ResourceManager {
  constructor(bridge) {
    this.bridge = bridge;
  }

  encodeResources(urls) {
    if (!Array.isArray(urls)) return Promise.reject(Error.Errors.INVALID_PARAMS);
    return this.bridge
      .sendMessage('core.resource.encode', { urls })
      .then((response) => response.urls);
  }

  encodeResource(url) {
    return this.encodeResources([url]);
  }

  uploadFile(bucketId, prefix, file) {
    if (!bucketId || !file || !prefix) return Promise.reject(Error.Errors.INVALID_PARAMS);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        this.bridge
          .sendLargeMessage('core.resource.upload', {
            bucketId,
            prefix,
            data,
          })
          .then((response) => resolve(response))
          .catch((error) => {
            reject(error);
          });
      };

      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
}
