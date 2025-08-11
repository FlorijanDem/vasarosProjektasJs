import styles from "./excursionCard.module.css";
import ModifyModalController from "../../pages/AdminPanel/ModifyModalController";
import { useState } from "react";

const ExcursionCardAdmin = ({ excursion }) => {
  const [showModify, setShowModify] = useState(false);
  const openModifyModal = () => {
    setShowModify(true);
  };

  return (
    <>
      <article className={styles.card}>
        <figure className={styles.figure}>
          <div className={styles.textContainer}>
            <h2 className={styles.cardTitle}>{excursion.title}</h2>
          </div>
          <div className="w-full h-full flex flex-col px-10 text-xl">
            <h2>Participating: </h2>
            <h2>Canceled: </h2>
          </div>
          <div className="flex w-full justify-end p-8">
            <button
              className="rounded-lg border-2 text-2xl text-gray-400 cursor-pointer inline-block font-medium leading-5 m-0 px-3 py-2 text-center transition-all duration-200"
              onClick={openModifyModal}
            >
              Modify
            </button>
          </div>
        </figure>
      </article>

      {showModify && (
        <ModifyModalController
          isOpen={showModify}
          onClose={() => setShowModify(false)}
          excursion={excursion}
        />
      )}
    </>
  );
};

export default ExcursionCardAdmin;
