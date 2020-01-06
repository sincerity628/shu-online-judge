import request from './request';

export default {
  // authentication
  login: (data) => request.post('/auth', data),
  register: (data) => request.post('/register', data),
  getUserInfo: (data) => request.get('/me'),
  // user
  getUser: (id) => request.get(`/users/${id}`),
  // problem
  getProblems: (data) => request.get('/problems', { params: data }),
  getProblem: (id) => request.get(`/problems/${id}`),
  getContestProblems: (id) => request.get(`/contests/${id}/problems`),
  getContestProblem: (contestId, problemId) =>
    request.get(`/contests/${contestId}/problems/${problemId}`),
  // tag
  getTags: () => request.get('/tags'),
  // announcement
  getAllAnnouncements: () => request.get('/announcements'),
  getAnnouncement: (id) => request.get(`/announcements/${id}`),
  // submission or commit
  getSubmissions: (data) => request.get('/submissions', { params: data }),
  getSubmission: (id) => request.get(`/submissions/${id}`),
  getPracticeSubmission: (id) => request.get(`/problems/${id}/submissions`),
  createPracticeSubmission: (data) => request.post(`/problems/${data.id}/submissions`, {
    code: data.code,
    language: data.language
  }),
  getContestSubmission: (data) =>
    request.get(`/contests/${data.contestId}/problems/${data.problemId}/submissions`),
  getContestSubmissions: (data) =>
    request.get(`/contests/${data.contestId}/submissions`, {
      params: {
        page: data.page,
        size: data.size
      }
    }),
  createContestSubmission: (data) =>
    request.post(`/contests/${data.contestId}/problems/${data.problemId}/submissions`, {
      code: data.code,
      language: data.language
    }),
  // contest
  getContests: (data) => request.get('/contests', { params: data }),
  getContest: (id) => request.get(`/contests/${id}`),
  joinContest: (data) => request.post(`/contests/${data.id}/join?password=${data.password}`),
  // rank
  getRank: (data) => request.get('/users/ranking', { params: data }),
  getContestRank: (id) => request.get(`/contests/${id}/ranking`),
  // group
  getGroups: () => request.get('/groups'),

}
