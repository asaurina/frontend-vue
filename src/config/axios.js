import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_API,
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
    const hasToken = localStorage.getItem('access_token');
    const language = localStorage.getItem('locale') || 'en';

    config.headers = Object.assign(
      {
        Authorization: `Bearer ${hasToken}`,
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
    if (response.status !== 200) {
      console.log({ message: response.statusText || 'Error', type: 'error', duration: 5 * 1000 });

      if (response.status === 50008 || response.status === 50012 || response.status === 50014) {
        console.log('You have been logged out, you can cancel to stay on this page, or log in again').then(() => {
          store.dispatch('auth/fetchAccessToken').then(() => {
            location.reload();
          });
        });
      }

      return Promise.reject(new Error(response.statusText || 'Error'));
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
