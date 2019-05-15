import Vatom from './Vatom';
import Emitter from '../util/EventEmitter';

export default class VatomEmitter extends Vatom {
  constructor(data) {
    super(data);
    this.emitter = new Emitter();
  }

  updateData(value) {
    this.vatomData = value;
    if (this.emitter) {
      this.emitter.emit('update', this);
    }
  }

  addEventListener(name, callback) {
    this.emitter.on(name, callback);
  }

  removeEventListener(name, callback) {
    this.emitter.off(name, callback);
  }
}
