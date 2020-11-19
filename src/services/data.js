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