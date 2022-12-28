import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

// axios.defaults.baseURL = 'https://hidden-cliffs-88299.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use(request => {
    // Edit request config
    return request;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
