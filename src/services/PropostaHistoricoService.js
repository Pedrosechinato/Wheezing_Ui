import api from '../api/api';

function getAll(id) {
    return api.get(`/historico/${id}`);
}

function createHistoricoProposta(data){
    return api.post('/historico', data)
  }

  export { getAll, createHistoricoProposta };