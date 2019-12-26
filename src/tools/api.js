import request from './request';

export default {
  // authentication
  login: (data) => request.post('/auth', data),
  register: (data) => request.post('/register', data),
  getUserInfo: (data) => request.get('/me'),
  // problem
  getProblems: (data) => request.get('/problems', { params: data }),
  // tag
  getTags: () => request.get('/tags'),
  // announcement
  getAllAnnouncements: () => request.get('/announcements'),
  getAnnouncement: (id) => request.get(`/announcements/${id}`),

}
