/**
 * Created by LHammer on 18/02/28.
 * axios 配置
 */
import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// http request拦截器
axios.interceptors.request.use((config) => {
    // POST传参序列化
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use((res) => {
    if (res.data.code) {
        return Promise.reject(res);
    }
    return res.data;
}, (error) => {
    // 404等错误处理
    return Promise.reject(error);
});

export default axios;
