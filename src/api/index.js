/**
 * Created by LHammer on 18/02/28.
 * api 接口
 */
import axios from './config';

export function fetch(url, params, type = 'post') {
  return new Promise((resolve, reject) => {
    axios[type](url, params).then((response) => {
      if (response.code === 0) {
        resolve(response.data);
      } else {
        alert(response.message);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

export default {
  /**
   * 测试接口
   * @param {*} data username
   */
  test(data) {
    return fetch('/webapi/uc_my_userinfo', data);
  },
  /**
   * app获取出借信息接口
   */
  getLoanInfo() {
    return fetch('/webapi/getLoanInfo');
  },
  /**
   * app领取加息券接口
   * @param {*} data cash -> id
   */
  getCash(data) {
    return fetch('/webapi/getCash', data);
  },
};
