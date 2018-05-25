/**
 * Created by LHammer on 18/04/21.
 * ES6 version
 * @method store
 * @description For better operation of the localStorage API.
 */
import { isObject, isNumber } from './viewType';
import { parse } from './date';

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
  constructor(strstamps = 's') {
    this.strstamps = strstamps; // 字符戳
    this.serialize = serialize;
    this.deserialize = deserialize;
    this.storage = window.localStorage;

    if (!this.storage) {
      throw new Error('Environment does not support localStorage.');
    }
    console.log(this.storage);
  }
  vaild(key) {
    return `${this.strstamps}-${key}`;
  }
  /**
   * set localStorage
   * @param {Sting} key
   * @param {String|Object|Number} value
   * @param {Number|String} long 保存时间，默认单位为天 12h -> .5d || yyyy-MM-dd HH:mm:ss -> 2018.08.29 23:59:59
   */
  set(key, value, long = 29) {
    const item = {};
    const curtime = new Date().getTime();
    item.val = value;
    item.exp = !isNumber(long)
      ? parse(long).getTime()
      : curtime + long * 24 * 60 * 60 * 1000; // 过期时间
    this._setItem(key, item);
  }
  /**
   * get localStorage
   * @param {String} key
   */
  get(key) {
    const obj = this._getItem(key);

    if (!obj) {
      return null;
    }

    if (new Date().getTime - obj.exp >= 0) {
      this.remove(key);
    }

    return obj.val;
  }
  /**
   * 删除
   * @param {String} key
   */
  remove(key) {
    this.storage.removeItem(key);
  }
  /**
   * 返回缓存长度
   */
  length() {
    this.storage.length;
  }
  /**
   * 更新缓存
   * @param {Sting} key
   * @param {String|Object|Number} value
   */
  update(key, value) {
    const item = this._getItem(key);
    item.val = value;
    this._setItem(key, item);
  }
  /**
   * setItem
   * @param {Sting} key
   * @param {String|Object|Number} value
   */
  _setItem(key, item) {
    this.storage.setItem(this.vaild(key), this.serialize(item));
  }
  /**
   * getItem
   * @param {Sting} key
   */
  _getItem(key) {
    return this.deserialize(this.storage.getItem(this.vaild(key)));
  }
}
