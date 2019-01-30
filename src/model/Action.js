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
export default class Action {
  constructor(data) {
    this.actionData = data;
  }

  get abortOnMainError() {
    return this.actionData.abort_on_main_error;
  }

  get abortOnPostError() {
    return this.actionData.abort_on_post_error;
  }

  get abortOnPreError() {
    return this.actionData.abort_on_pre_error;
  }

  get actionNotification() {
    return this.actionData.action_notification;
  }

  get guestUser() {
    return this.actionData.guest_user;
  }

  get limitPerUser() {
    return this.actionData.limit_per_user;
  }

  get name() {
    return this.actionData.name;
  }

  get params() {
    return this.actionData.params;
  }

  get config() {
    return this.actionData.config;
  }

  get policy() {
    return this.actionData.policy;
  }

  get reactor() {
    return this.actionData.reactor;
  }

  get rollback() {
    return this.actionData.rollback;
  }

  get stateImpact() {
    return this.actionData.state_impact;
  }

  get timeout() {
    return this.actionData.timeout;
  }

  get wait() {
    return this.actionData.wait;
  }
}
