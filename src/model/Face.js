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
import FaceProperties from './FaceProperties';

export default class Face {
  constructor(data) {
    this.faceData = data;
  }

  get id() {
    return this.faceData.id;
  }

  get templateId() {
    return this.faceData.template;
  }

  get createdBy() {
    return this.faceData.meta.created_by;
  }

  get whenCreated() {
    return this.faceData.meta.when_created;
  }

  get whenModified() {
    return this.faceData.meta.when_modified;
  }

  get properties() {
    return new FaceProperties(this.faceData.properties);
  }
}
