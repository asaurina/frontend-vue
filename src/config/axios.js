import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_API_URL,
  timeout: 5000,
  responseType: 'json',
  headers: {
    Accept: 'application/vnd.api.v1+json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'Access-Control-*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, user-agent',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS, HEAD',
  },
});

service.interceptors.request.use(
  (config) => {
    const language = localStorage.getItem('locale') || 'en';

    config.headers = Object.assign(
      {
        'Accept-Language': language,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      config.headers
    );

    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
