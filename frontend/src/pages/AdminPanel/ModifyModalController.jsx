import ModifyExcursionModal from "./ModifyModal";
const API_URL = import.meta.env.VITE_API_URL;
const ModifyModalController = ({ isOpen, onClose, excursion }) => {
  const handleSave = async (updatedExcursion) => {
    try {
      const res = await fetch(`${API_URL}/excursions/${updatedExcursion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedExcursion.title,
          photo_url: updatedExcursion.photo_url,
          duration: updatedExcursion.duration,
          dates: updatedExcursion.dates,
          category_id: Number(updatedExcursion.category_id),
        }),
       credentials:"include"
      });
      if (!res.ok) throw new Error("Failed to update excursion");
      await res.json();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModifyExcursionModal
      isOpen={isOpen}
      onClose={onClose}
      excursion={excursion}
      onSave={handleSave}
    />
  );
};

export default ModifyModalController;
