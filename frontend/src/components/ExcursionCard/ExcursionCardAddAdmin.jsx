
import { useState } from 'react';
import AddModalController from '../../pages/AdminPanel/AddModalController'
import AddButton from '../../assets/plus-circle-fill.svg'
const ExcursionCardAddAdmin = ({excursion}) => {
const [showAdd, setShowAdd] = useState(false);
  const openAddModal = ( ) => {
    setShowAdd(true);
  };
  return (
      <div className='flex justify-center w-full h-full '>
          <button onClick={openAddModal}>
            <img src={AddButton} alt="Add Excursion Button" width={30} className='img-invert'/>
            </button>
            {showAdd && (
        <AddModalController
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          excursion={excursion}
        />
      )}
      </div>
      
  );

};

export default ExcursionCardAddAdmin;
