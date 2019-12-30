import request from './request';

export default {
  // authentication
  login: (data) => request.post('/auth', data),
  register: (data) => request.post('/register', data),
  getUserInfo: (data) => request.get('/me'),
  // problem
  getProblems: (data) => request.get('/problems', { params: data }),
  getProblem: (id) => request.get(`/problems/${id}`),
  // tag
  getTags: () => request.get('/tags'),
  // announcement
  getAllAnnouncements: () => request.get('/announcements'),
  getAnnouncement: (id) => request.get(`/announcements/${id}`),
  // commit
  createSubmission: (result) => request.post(`/problems/${result.id}/submissions`, {
    code: result.code,
    language: result.language
  }),


}
