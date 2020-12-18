import api from '../api/api';

function createAvalicao(proposta){
  return api.post('/avaliacao', proposta)
}

function getById(_id,estado){
  
  return api.get(`/avaliacao?id=${_id}&estado=${estado}`)
}

function getByMusicoId(_id){
  
  return api.get(`/avaliacao/musico/${_id}`)
}

function updateNota(_id, notas){
  
  return api.put(`/avaliacao/${_id}`, notas)
}

export { createAvalicao, getById, updateNota, getByMusicoId };
