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
import Vatom from '../model/Vatom';

export default class VatomManager {
  constructor(bridge) {
    this.bridge = bridge;
  }

  getVatom(id) {
    if (id == null || id.length === 0) return Promise.reject(Error.Errors.INVALID_PARAMS);
    return this.bridge
      .sendMessage('core.vatom.get', { id })
      .then((response) => new Vatom(response.vatom));
  }

  getInventoryStats(templateVariations) {
    if (templateVariations == null) return Promise.reject(Error.Errors.INVALID_PARAMS);
    return this.bridge.sendMessage('core.inventory.stats', {
      template_variations: templateVariations,
    });
  }

  getChildren(parentId) {
    if (parentId == null || parentId.length === 0)
      return Promise.reject(Error.Errors.INVALID_PARAMS);
    return this.bridge
      .sendMessage('core.vatom.children.get', { id: parentId })
      .then((response) => response.vatoms.map((vatom) => new Vatom(vatom)));
  }

  setParentId(vatomId, parentId) {
    if (vatomId == null || vatomId.length === 0 || parentId == null || parentId.length === 0)
      return Promise.reject(Error.Errors.INVALID_PARAMS);
    return this.bridge.sendMessage('core.vatom.parent.set', {
      id: vatomId,
      parent_id: parentId,
    });
  }

  performAction(name, payload) {
    if (
      name == null ||
      name.length === 0 ||
      payload == null ||
      payload['this.id'] == null ||
      payload['this.id'].length === 0
    )
      return Promise.reject(Error.Errors.INVALID_PARAMS);

    return this.bridge.sendMessage('core.action.perform', { action_name: name, payload });
  }
}
