import axios from "axios";
import { api } from "./index";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const fileConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const publicGet = async (endpoint) => {
  const response = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};
export const publicGetSingle = async (endpoint, id) => {
  const response = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};

export const publicPost = async (endpoint, body) => {
  const response = await axios.post(`${api}${endpoint}`, body, config);
  return response.data;
};

export const privateGet = async (endpoint, token) => {
  config.headers.Authorization = `${token}`;
  const response = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};

export const privatePost = async (endpoint, token, body) => {
  config.headers.Authorization = `${token}`;
  const response = await axios.post(`${api}${endpoint}`, body, config);
  return response.data;
};

export const privatePut = async (endpoint, token, body) => {
  config.headers.Authorization = `${token}`;
  const response = await axios.put(`${api}${endpoint}`, body, config);
  return response.data;
};


export const privateAvatarPut = async (endpoint, token, body) => {
  fileConfig.headers.Authorization = `${token}`;
  const response = await axios.put(`${api}${endpoint}`, body, fileConfig);
  console.log("body",body);
  return response.data;
};

export const privateDelete = async (endpoint) => {
  const response = await axios.delete(`${api}${endpoint}`);
  return response.data;
};
export const publicPut = async (endpoint, body) => {
  const response = await axios.put(`${api}${endpoint}`, body, config);
  return response.data;
};