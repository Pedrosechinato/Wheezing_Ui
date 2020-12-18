import api from '../api/api';

function getAll() {
  return api.get('/proposta');
}

function getById(_id,status){
  
  return api.get(`/propostas?id=${_id}&status=${status}`)
}

function getInfoById(_id){
  
  return api.get(`/propostainfo/${_id}`)
}

function getByIdEst(_id,status){
  
  return api.get(`/propostasest?id=${_id}&status=${status}`)
}

function createProposta(data){
  return api.post('/proposta', data)
}

function rejectProposta(_id){
  
  return api.put(`/propostarej/${_id}`)
}

function acceptProposta(_id){
  
  return api.put(`/propostaaccep/${_id}`)
}

function changeProposta(_id, dados){
  return api.put(`/proposta/${_id}`, dados)
}

export { getAll, getById, createProposta, rejectProposta, acceptProposta, getByIdEst, getInfoById, changeProposta };
