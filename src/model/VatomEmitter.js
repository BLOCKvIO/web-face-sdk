import Vatom from './Vatom';
import Emitter from '../util/EventEmitter';

export default class VatomEmitter extends Vatom {
  constructor(data, bridge) {
    super(data);
    this.bridge = bridge;
    this.emitter = new Emitter();
  }

  set vatomData(value) {
    super.vatomData = value;
    if (this.emitter) {
      this.emitter.emit('update', this);
    }
  }

  addEventListener(name, callback) {
    this.emitter.on(name, callback);
    if (name === 'children') {
      this.bridge.sendMessage('core.vatom.children.observe', { id: this.id })
        .then(response => response.vatoms.map(vatom => new Vatom(vatom)))
        .then(vatoms => this.emitter.emit('children', vatoms));
    }
  }

  removeEventListener(name, callback) {
    this.emitter.off(name, callback);
  }
}
