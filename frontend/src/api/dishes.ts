import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getDishes = async () => {
  const res = await axios.get(`${API_URL}/dishes`);
  return res.data;
};