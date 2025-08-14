import ModifyExcursionModal from "./ModifyModal";
const API_URL = import.meta.env.VITE_API_URL;
const ModifyModalController = ({
  isOpen,
  onClose,
  excursion,
}) => {
  const handleSave = async (updatedExcursion) => {
    const HHMMSSToSeconds = (hhmmss) => {
  const [h, m, s] = hhmmss.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};
    try {
      const res = await fetch(`${API_URL}/excursions/${updatedExcursion.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedExcursion.title,
          photo_url: updatedExcursion.photo_url,
          duration: HHMMSSToSeconds(updatedExcursion.duration),
          price: updatedExcursion.price,
          category_id: Number(updatedExcursion.category_id),
          description: updatedExcursion.description,
          location: updatedExcursion.location
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update excursion");
      await res.json();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Update Failed: ", error.message);
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
