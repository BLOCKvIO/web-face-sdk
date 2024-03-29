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
import PublicUser from '../model/PublicUser';
import CurrentUser from '../model/CurrentUser';

export default class UserManager {
  constructor(bridge) {
    this.bridge = bridge;
  }

  getPublicUser(id) {
    if (id == null) return Promise.reject(Error.Errors.INVALID_PARAMS);
    return this.bridge
      .sendMessage('core.user.get', { id })
      .then((response) => new PublicUser(response.user));
  }

  getCurrentUser() {
    return this.bridge
      .sendMessage('core.user.current.get', {})
      .then((response) => new CurrentUser(response.user));
  }
}
