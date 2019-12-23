import axios from 'axios';
import { base_url } from './base_url';

// create anaxios instance
const request = axios.create({
  baseURL: base_url
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

// axios相应拦截器
request.interceptors.response.use(
  res => {
    // status code: 200
    if(res.status === 200) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
   // status code: other
  error => {
    if(error) {
      switch(error.response.status) {
        case 400:
          return Promise.resolve(error.response);
        case 401:
          return Promise.resolve(error.response);
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
          alert(error.response.data.message);
      }
    }
  }
);

export default request;
