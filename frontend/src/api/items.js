import axios from 'axios';

const API_URL = '/api/items';

export const getItems = async () => {
  const response = await axios.get(API_URL);
  // Normalize to always return an array
  if (Array.isArray(response.data)) {
    return response.data;
  } else if (Array.isArray(response.data.data)) {
    return response.data.data;
  } else {
    return [];
  }
};

export const getItem = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}; 