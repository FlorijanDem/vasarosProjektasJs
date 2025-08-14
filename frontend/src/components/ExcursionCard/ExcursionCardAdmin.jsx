import styles from "./excursionCard.module.css";
import ModifyModalController from "../../pages/AdminPanel/ModifyModalController";
import DeleteModalController from "../../pages/AdminPanel/DeleteModalController";
import { useState } from "react";

const ExcursionCardAdmin = ({ excursion }) => {
  const [showModify, setShowModify] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const openModifyModal = () => {
    setShowModify(true);
  };
  const openDeleteModal = () => {
    setShowDelete(true);
  }

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
          <div className="flex w-full justify-end p-8 gap-4">
            <button
              className="rounded-lg border-2 text-2xl bg-[var(--lighter-background-color)] cursor-pointer inline-block font-medium leading-5 m-0 px-3 py-2 text-center transition-all duration-200"
              onClick={openDeleteModal}
            >
              Delete
            </button>
            <button
              className="rounded-lg border-2 text-2xl bg-[var(--lighter-background-color)] cursor-pointer inline-block font-medium leading-5 m-0 px-3 py-2 text-center transition-all duration-200"
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
      {showDelete && (
        <DeleteModalController
          isOpen={showDelete}
          onClose={() => setShowDelete(false)}
          excursion={excursion}
        />
      )}
    </>
  );
};

export default ExcursionCardAdmin;
