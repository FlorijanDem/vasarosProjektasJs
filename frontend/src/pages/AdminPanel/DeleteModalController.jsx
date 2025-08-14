import DeleteExcursionModal from "./DeleteModal";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const DeleteModalController = ({
    isOpen,
    onClose,
    excursion
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/excursions/${excursion.id}`,{withCredentials:true})
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Delete Failed: ", error.message);
    }
  };

  return (
    <DeleteExcursionModal
      onConfirm={handleDelete}
      isOpen={isOpen}
      onClose={onClose}
      excursion={excursion}
    />
  );
};

export default DeleteModalController;
