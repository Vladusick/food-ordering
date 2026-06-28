import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getDishes = async () => {
  const res = await axios.get(`${API_URL}/dishes`);
  return res.data;
};