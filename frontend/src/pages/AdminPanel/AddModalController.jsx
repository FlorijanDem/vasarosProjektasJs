import { useState } from "react";
import AddExcursionModal from "./AddModal";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const AddModalController = ({ isOpen, onClose, excursion,  }) => {
      const HHMMSSToSeconds = (hhmmss) => {
  const [h, m, s] = hhmmss.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}; 
const [errorMessage, setErrorMessage] = useState([]);
  const handleAdd = async (newExcursion) => {
  try {
    await axios.post(
    `${API_URL}/excursions`,
    {
      title: newExcursion.title,
      photo_url: newExcursion.photo_url,
      duration: HHMMSSToSeconds(newExcursion.duration),
      price: newExcursion.price,
      category_id: Number(newExcursion.category_id),
      description: newExcursion.description,
      location: newExcursion.location
    },
    { withCredentials: true } 
  );
  onClose();
  window.location.reload();
} catch (error) {
 const errors = error.response?.data?.errors;
      setErrorMessage(
        error.response?.data?.message ||
          (Array.isArray(errors)
            ? errors.map((e) => e.msg).join("\n")
            : "Registration failed")
      );
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
}
  };
  return (
    <AddExcursionModal
      isOpen={isOpen}
      onClose={onClose}
      excursion={excursion}
      onSave={handleAdd}
      errorMessage={errorMessage}
    />
  );
};

export default AddModalController;
