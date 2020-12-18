import api from '../api/api';

function hasDocumento(documento) {
  return api.get(`/hasDocumento/${documento}`);
}

function hasEmail(email) {
  return api.get(`/hasEmail/${email}`);
}

function hasUsername(username) {
  return api.get(`/hasUserName/${username}`);
}

export { hasEmail, hasUsername, hasDocumento };
