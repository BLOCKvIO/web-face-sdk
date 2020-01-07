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
export default class CurrentUser {
  constructor(data) {
    this.userData = data;
  }

  get id() {
    return this.userData.id;
  }

  get firstName() {
    return this.userData.properties.first_name;
  }

  get lastName() {
    return this.userData.properties.last_name;
  }

  get avatarUri() {
    return this.userData.properties.avatar_uri;
  }

  get isGuest() {
    return this.userData.properties.is_guest;
  }

  get hasVerifiedEmail() {
    return this.userData.tokens && this.userData.tokens.has_verified_email;
  }

  get hasVerifiedPhone() {
    return this.userData.tokens && this.userData.tokens.has_verified_phone;
  }
}
