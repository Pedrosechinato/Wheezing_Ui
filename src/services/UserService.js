import api from '../api/api';

function login({ email, senha }) {
  return api.post('/auth', { email, senha });
}

function getUser(_id) {
  return api.get(`/user/${_id}`);
}

function postUser(params) {
  return api.post('/user', params);
}

function putUser(params) {
  return api.put(`/user`, params);
}
export { login, getUser, postUser, putUser };
