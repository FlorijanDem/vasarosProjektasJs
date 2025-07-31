import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getData = async (endpoint) => {
  const response = await axios.get(`${API_URL}/${endpoint}`, {
    withCredentials: true,
  });

  return response.data;
};
