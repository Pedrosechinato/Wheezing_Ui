import axios from 'axios';

function getCEP(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}

export { getCEP };
