import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your server URL

export const getAllItems = () => axios.get(`${API_BASE_URL}/items`);
export const createItem = (data) => axios.post(`${API_BASE_URL}/items`, data);
export const updateItem = (id, data) => axios.put(`${API_BASE_URL}/items/${id}`, data);
export const deleteItem = (id) => axios.delete(`${API_BASE_URL}/items/${id}`);