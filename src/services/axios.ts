import axios from 'axios';

const axios_instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
});

export default axios_instance;
