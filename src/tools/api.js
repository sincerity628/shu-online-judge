import request from './request';

export default {
  // authentication
  login: (data) => request.post('/auth', data),
  register: (data) => request.post('/register', data),
}
