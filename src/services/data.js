import axios from 'axios';
import config from '../config/config';

export const getAllTransportationsForUser = async (token) => {
  const res = await axios.get(config.serverBaseURL + '/getMyTransportations?authToken=' + token);
  return res.data;
};

export const signUp = async (firstName, lastName, email, password) => {
  const res = await axios.post(config.serverBaseURL + '/register', { firstName, lastName, email, password });
  return res.data;
};

export const generateTransportation = async (token) => {
  const res = await axios.get(config.serverBaseURL + '/generateSample?authToken=' + token);
  return res.data;
};

export const getAllTransportations = async (token) => {
  const res = await axios.get(config.serverBaseURL + '/getAllTransportations?authToken=' + token);
  return res.data;
};

export const getAllUsers = async (token) => {
  const res = await axios.get(config.serverBaseURL + '/getAllUsers?authToken=' + token);
  return res.data;
};

export const toggleAdmin = async (token, userId, isAdmin) => {
  const res = await axios.get(config.serverBaseURL + '/toggleAdmin?authToken=' + token + '&userId=' + userId + '&isAdmin=' + isAdmin);
  return res.data;
};

export const deleteUser = async (token, userId) => {
  const res = await axios.get(`${config.serverBaseURL}/deleteUser/${userId}?authToken=${token}`);
  return res.data;
};

export const deleteTransport = async (token, transportId) => {
  const res = await axios.get(`${config.serverBaseURL}/deleteTransport/${transportId}?authToken=${token}`);
  return res.data;
};

export const getBackup = async (token) => {
  axios({
    url: `${config.serverBaseURL}/backup/?authToken=${token}`,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'backup.json');
    document.body.appendChild(link);
    link.click();
  });
};

export const sendBackup = async (token, backup) => {
  const res = await axios.post(`${config.serverBaseURL}/backup/?authToken=${token}`, backup);
  return;
};