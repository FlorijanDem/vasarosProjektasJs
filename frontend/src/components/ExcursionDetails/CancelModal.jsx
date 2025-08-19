import styles from "./modals.module.css";
import { useRef, useEffect } from "react";

const CancelModal = ({ onClose }) => {
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
        <h2 className={styles.title}>Cancel Reservation?</h2>

        <p className={styles.textWrapper}>
          Do you really want to cancel your excursion? Once cancelled, it cannot
          be reversed.
        </p>
        <div className={styles.btnWrapper}>
          <button
            className={styles.cancelBtn}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button className={styles.confirmBtn}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
