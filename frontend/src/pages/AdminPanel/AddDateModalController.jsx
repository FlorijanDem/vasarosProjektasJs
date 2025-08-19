
import AddDateModal from "./AddDateModal";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const AddModalController = ({ isOpen, onClose, excursion }) => {
      const HHMMSSToSeconds = (hhmmss) => {
  const [h, m, s] = hhmmss.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};
const handleSave = async (newExcursion) => {
  try {
    await axios.post(
      `${API_URL}/excursions/date`,
      {
        id: newExcursion.id,    
        tour_id: excursion.id,    
        date: newExcursion.date
      },
      { withCredentials: true }
    );

    onClose();
    window.location.reload();
  } catch (error) {
    console.error("Create Failed:", error.response?.data || error.message);
  }
};
  return (
    <AddDateModal
      isOpen={isOpen}
      onClose={onClose}
      excursion={excursion}
      onSave={handleSave}
    />
  );
};

export default AddModalController;
