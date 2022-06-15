import axios from 'axios';
import config from '../config/config';

export const signIn = async (email, password) => {
  const res = await axios.post(config.serverBaseURL + '/login', { email, password });
  return res.data;
};

export const signUp = async (firstName, lastName, email, password) => {
  const res = await axios.post(config.serverBaseURL + '/register', { firstName, lastName, email, password });
  return res.data;
};