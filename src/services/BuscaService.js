import api from '../api/api';

function getIntru() {
  return api.get('/instrumentos');
}

function getGeneros() {
  return api.get('/generos');
}

function getAllUsers(params) {
  return api.get('/users', { params });
}

export { getIntru, getGeneros, getAllUsers };
