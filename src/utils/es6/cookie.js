/**
 * Created by LHammer on 18/04/21.
 * ES6 version
 * @method cookie
 * @description For better operation of the cookie API.
 */
import { isNumber } from './viewType';
import { parse } from './date';

export default class cookie {
  constructor(strstamps = 'c') {
    this.strstamps = strstamps; // 字符戳
    this.cookie = document.cookie;
  }
  vaild(key) {
    return `${this.strstamps}-${key}`;
  }

  /**
   * cookie.set
   * @param {Sting} key
   * @param {String|Object|Number} value
   * @param {Number|String} long 保存时间，默认单位为天 12h -> .5d || yyyy-MM-dd HH:mm:ss -> 2018.08.29 23:59:59
   */
  set(key, value, long = 10000) {
    const curtime = new Date();
    const exp = !isNumber(long)
      ? parse(long)
      : curtime.setDate(curtime.getDate() + long); // 过期时间

    if (this.has(key)) {
      throw new Error(`The ${key} already exists in cookie~`);
    }
    this._setItem(key, value, exp);
  }

  /**
   * cookie.get
   * @param {String} key
   */
  get(key) {
    return this._getItem(key);
  }

  /**
   * cookie.remove
   * @param {String} key
   */
  remove(key) {
    if (!this.has(key)) return;
    this._setItem(key, '', new Date(-1));
  }

  /**
   * cookie.has 是否存在
   * @param {String} key
   */
  has(key) {
    const keys = this._keys();

    return keys.indexOf(this.vaild(key)) !== -1;
  }

  /**
   * @returns {Object} 所有key
   */
  _keys() {
    const keys = [];
    const items = this.cookie.split('; ');

    for (const item of items) {
      keys.push(item.split('=')[0]);
    }

    return keys;
  }

  /**
   * 添加cookie
   */
  _setItem(key, value, exp) {
    document.cookie = `${this.vaild(key)}=${value};expires=${exp}`;
  }

  /**
   * 获取cookie
   */
  _getItem(key) {
    let snap = [];
    const items = this.cookie.split('; ');

    for (const item of items) {
      snap = item.split('=');
      if (snap[0] === this.vaild(key)) {
        return snap[1];
      }
    }

    return null;
  }
}
