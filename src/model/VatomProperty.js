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
export default class VatomProperty {
  constructor(data) {
    this.propertyData = data;
  }

  get isAcquirable() {
    return this.propertyData.acquirable;
  }

  get age() {
    return this.propertyData.age;
  }

  get author() {
    return this.propertyData.author;
  }

  get category() {
    return this.propertyData.category;
  }

  get clonedFrom() {
    return this.propertyData.cloned_from;
  }

  get cloningScore() {
    return this.propertyData.cloning_score;
  }

  get commerce() {
    return this.propertyData.commerce;
  }

  get description() {
    return this.propertyData.description;
  }

  get isDisabled() {
    return this.propertyData.disabled;
  }

  get isDropped() {
    return this.propertyData.dropped;
  }

  get geoPos() {
    return this.propertyData.geo_pos;
  }

  get inContract() {
    return this.propertyData.in_contract;
  }

  get inContractWith() {
    return this.propertyData.in_contract_with;
  }

  get notifyMssg() {
    return this.propertyData.notify_msg;
  }

  get numDirectClones() {
    return this.propertyData.num_direct_clones;
  }

  get owner() {
    return this.propertyData.owner;
  }

  get parentId() {
    return this.propertyData.parent_id;
  }

  get publisherFqdn() {
    return this.propertyData.publisher_fqdn;
  }

  get isRedeemable() {
    return this.propertyData.redeemable;
  }

  get resources() {
    return this.propertyData.resources;
  }

  get rootType() {
    return this.propertyData.root_type;
  }

  get tags() {
    return this.propertyData.tags;
  }

  get template() {
    return this.propertyData.template;
  }

  get templateVariation() {
    return this.propertyData.template_variation;
  }

  get title() {
    return this.propertyData.title;
  }

  get isTradeable() {
    return this.propertyData.tradeable;
  }

  get isTransferable() {
    return this.propertyData.transferable;
  }

  get transferredBy() {
    return this.propertyData.transferred_by;
  }

  get visibility() {
    return this.propertyData.visibility;
  }
}
