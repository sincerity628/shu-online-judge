import request from './request';

export default {
  // authentication
  login: (data) => request.post('/auth', data),
  register: (data) => request.post('/register', data),
  getUserInfo: (data) => request.get('/me'),
  // get problems
  getProblems: (data) => request.get('/problems', { params: data }),
  getTags: () => request.get('/tags'),

}
