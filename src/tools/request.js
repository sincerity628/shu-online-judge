import axios from 'axios';
import { base_url } from './base_url';

// create anaxios instance
const request = axios.create({
  baseURL: base_url,
  timeout: 5000 //请求超时时间
});

// axios请求拦截器
request.interceptors.request.use(
  function(config) {
      // 设置统一的请求头
    let token = localStorage.getItem('token');
    if(token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// axios响应拦截器
request.interceptors.response.use(
  res => {
    // status code: 200
    if(res && res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
   // status code: other
  error => {
    if(error && error.response) {
      switch(error.response.status) {
        case 500:
          alert('服务器发生错误，请检查服务器');
          break;
        case 502:
          alert('网关错误');
          break;
        case 503:
          alert('服务不可用，服务器暂时过载或维护');
          break;
        case 504:
          alert('网关超时');
          break;
        default:
          return Promise.reject(error.response);
      }
    }
    else {
      return Promise.reject(error);
    }
    return Promise.reject(error.response);
  }
);

export default request;
