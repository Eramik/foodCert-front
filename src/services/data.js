import axios from 'axios';
import config from '../config/config';

export const getAllTransportationsForUser = async (token) => {
  const res = await axios.get(config.serverBaseURL + '/getMyTransportations?authToken=' + token);
  console.log('Data: ', res.data);
  return res.data;
};

export const signUp = async (firstName, lastName, email, password) => {
  const res = await axios.post(config.serverBaseURL + '/register', { firstName, lastName, email, password });
  console.log("Data: ", res.data);
  return res.data;
};

export const generateTransportation = async (token) => {
  const res = await axios.get(config.serverBaseURL + '/generateSample?authToken=' + token);
  console.log("Data: ", res.data);
  return res.data;
};

export const getAllTransportations = async (token) => {
  const res = await axios.get(config.serverBaseURL + '/getAllTransportations?authToken=' + token);
  console.log("Data: ", res.data);
  return res.data;
};

export const getAllUsers = async (token) => {
  const res = await axios.get(config.serverBaseURL + '/getAllUsers?authToken=' + token);
  console.log("Data: ", res.data);
  return res.data;
};

export const toggleAdmin = async (token, userId, isAdmin) => {
  const res = await axios.get(config.serverBaseURL + '/toggleAdmin?authToken=' + token + '&userId=' + userId + '&isAdmin=' + isAdmin);
  console.log("Data: ", res.data);
  return res.data;
};

export const deleteUser = async (token, userId) => {
  const res = await axios.get(`${config.serverBaseURL}/deleteUser/${userId}?authToken=${token}`);
  console.log("Data: ", res.data);
  return res.data;
};

export const deleteTransport = async (token, transportId) => {
  const res = await axios.get(`${config.serverBaseURL}/deleteTransport/${transportId}?authToken=${token}`);
  console.log("Data: ", res.data);
  return res.data;
};