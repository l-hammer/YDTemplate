/**
 * Created by LHammer on 18/04/21.
 * ES6 version
 * @method store
 * @description For better operation of the localStorage API.
 */
import { isObject } from './viewType';

/**
 * serialization for item.
 * @param {Object} item
 * @returns {String}
 */
const serialize = (item) => {
  return isObject(item) ? JSON.stringify(item) : item;
};

/**
 * Custom deserialization for data.
 * @param {String} value
 * @returns {Object}
 */
const deserialize = (value) => {
  return value || JSON.parse(value);
};

export default class store {
  constructor(name = '') {
    this.name = name;
    this.serialize = serialize;
    this.deserialize = deserialize;
    this.storage = window.localStorage;

    if (!this.storage) {
      throw new Error('Environment does not support localStorage.');
    }
  }
  set(key, value) {
    const curtime = new Date().getTime();
    this.storage.setItem(key, this.serialize({ val: value, time: curtime }));
  }
  get(key, exp) {
    const str = this.storage.getItem(key);
    const obj = this.deserialize(str);

    exp = exp || 24 * 60 * 60 * 1000;
    if (!obj) {
      return null;
    }

    if (new Date().getTime - obj.time >= exp) {
      this.remove(key);
    }

    return obj.val;
  }
  remove(key) {
    this.storage.removeItem(key);
  }
}
