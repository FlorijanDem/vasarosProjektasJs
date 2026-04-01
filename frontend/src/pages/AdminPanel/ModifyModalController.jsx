import ModifyExcursionModal from "./ModifyModal";
import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const ModifyModalController = ({
  isOpen,
  onClose,
  excursion,
}) => {
  const [errorMessage, setErrorMessage] = useState([]);
  const handleSave = async (updatedExcursion) => {
    const HHMMSSToSeconds = (hhmmss) => {
  const [h, m, s] = hhmmss.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};
    try {
     const res = await axios.put(
    `${API_URL}/excursions/${updatedExcursion.id}`,
    {
      title: updatedExcursion.title,
      photo_url: updatedExcursion.photo_url,
      duration: HHMMSSToSeconds(updatedExcursion.duration),
      price: updatedExcursion.price,
      category_id: Number(updatedExcursion.category_id),
      description: updatedExcursion.description,
      location: updatedExcursion.location,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  console.log("Updated excursion:", res.data);

  onClose();
  window.location.reload();
    }  catch (error) {
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
    <ModifyExcursionModal
      isOpen={isOpen}
      onClose={onClose}
      excursion={excursion}
      onSave={handleSave}
      errorMessage={errorMessage}
    />
  );
};

export default ModifyModalController;
