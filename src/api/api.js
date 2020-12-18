import axios from 'axios';

const api = axios.create({
  // IP do Expo
  baseURL: 'http://192.168.15.14:3333',
});

export default api;
