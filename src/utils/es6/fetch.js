/**
 * Created by LHammer on 18/05/26.
 * ES6 version
 * @method fetch
 * @description Package ajax function
 */
import { isObject } from './viewType';

function formatParams(data) {
  const params = [];

  if (isObject(data)) {
    for (const key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        params.push(`${key}=${data[key]}`);
      }
    }
  } else {
    throw new Error('data should be an object');
  }

  return params.join('&');
}

function fetch(opt) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    opt.data = formatParams(opt.data);
    if (opt.type === 'POST') {
      xhr.open(opt.type, opt.url, true);
      // 设置提交类型
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      xhr.send(opt.data);
    } else if (opt.type === 'GET') {
      xhr.open(opt.type, `${opt.url}?${opt.data}`, true);
      xhr.send(null);
    }

    /**
     * 监听readystatechange事件
     * @prop {Number} readyState 请求/响应过程的当前阶段，状态4表示已经接收到全部响应数据
     * @prop {Number} status 响应的Http的状态码，2xx（成功），3xx（重定向），4xx（客户端请求错误），5xx（服务器错误）
     */
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const { status } = xhr;
        if (status >= 200 && status < 300) {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } else {
          reject(xhr.responseText);
        }
      }
    };
  });
}

function jsonp(opt) {
  return new Promise((resolve, reject) => {
    let
      body = null,
      handler = null;
    const cbName = opt.jsonp;
    const script = document.createElement('script');
    const callback = opt.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2);

    handler = ({ type }) => {
      let status = 0;

      if (type === 'load' && body !== null) {
        status = 200;
      } else if (type === 'error') {
        status = 500;
      }

      if (status && window[callback]) {
        resolve(body);
        delete window[cbName];
        document.body.removeChild(script);
      }

      if (!status && type === 'abort') {
        reject(new Error('请求超时'));
      }
    };

    window[callback] = (result) => {
      body = JSON.parse(result);
    };

    opt.abort = () => {
      handler({ type: 'abort' });
    };

    if (opt.timeout) {
      setTimeout(opt.abort, opt.timeout);
    }

    opt.data[cbName] = callback;
    opt.data = formatParams(opt.data);
    script.src = `${opt.url}?${opt.data}`;
    script.type = 'text/javascript';
    script.onload = handler;
    script.onerror = handler;
    document.body.appendChild(script);
  });
}

/**
 * @param {String} url 接口地址
 * @param {Object} data 参数
 * @param {String} type GET、POST（默认）
 */
export default (url, data = {}, type = 'POST') => {
  const opt = {
    url: url,
    data: data,
    type: type.toUpperCase(),
    timeout: 5000,
  };
  opt.type === 'JSONP' ? opt.jsonp = 'pay_callback' : null;

  return opt.jsonp ? jsonp(opt) : fetch(opt);
};

/**
 * e.g.
 * const data = {
 *   name: 'LHammer',
 * }
 * ajax('/webapi/uc_my_userinfo', data).then((res) => {
 *   console.log(res);
 * }).catch((err) => {
 *   console.error(err);
 * });
 *
 * e.g. jsonp
 *
 * const data = {
 *   start_time: '2018-01-01',
 *   end_time: '2018-01-29',
 *   page: 1,
 *   page_size: 15,
 * };
 * ajax('http://liuwypay.yind123.com/user_querytrans', data, 'JSONP').then((res) => {
 *   console.log(res);
 * }).catch((err) => {
 *   console.error(err);
 * });
 */
