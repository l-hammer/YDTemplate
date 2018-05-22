/**
 * Created by LHammer on 18/02/28.
 * api 接口
 */
import axios from './config';

export function fetch(url, params = {}, type = 'post') {
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
   * --------------------------------------------------
   *                    以下为示例接口                   .
   * --------------------------------------------------
   */

  /**
   * 游戏初始化信息
   * @param {String} invitation_id 邀请人id
   */
  gameInfo(data) {
    return fetch('/wx/getGameInfo', data);
  },
  /**
   * 摇数 + 奖金记录
   * @param {String} act 'master_num': 邀请人摇数; slave_num: 被邀请人摇数; list: 奖金纪录
   * @param {String} invitation_id 邀请人加密id
   * @param {String} open_id 微信id
   */
  invite(data) {
    return fetch('/webapi/shakeNum', data);
  },
};
