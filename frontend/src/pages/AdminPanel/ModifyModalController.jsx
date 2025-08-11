import ModifyExcursionModal from "./ModifyModal"; 
const ModifyModalController = ({ isOpen, onClose, excursion }) => {

  const handleSave = (data) => {
    console.log("Saved excursion data:", data);


    onClose(); 
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
