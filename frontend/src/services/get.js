import axios from "axios";

export const getData = async () => {
  const response = await axios.get(`http://localhost:3001/api/v1/excursions`, {
    withCredentials: true,
  });

  return response.data;
};
