import styles from "./detailsModal.module.css";
import { useRef, useEffect } from "react";

const DetailsModal = ({ excursion, onClose }) => {
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2>{excursion.title}</h2>
        <p>{excursion.description}</p>
        <p>
          <strong>Location:</strong> {excursion.location}
        </p>
        <p>
          <strong>Price:</strong> {excursion.price} €
        </p>
        <p>
          <strong>Closest date:</strong>{" "}
          {new Date(excursion.tour_dates?.[0]).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default DetailsModal;
