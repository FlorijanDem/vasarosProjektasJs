import styles from "./detailsModal.module.css";
import "react-day-picker/dist/style.css";
import { useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";

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

  const availableDates = excursion.tour_dates.map((date) => new Date(date));

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.title}>{excursion.title}</h2>
        <p className={styles.desc}>{excursion.description}</p>
        <div className={styles.wrapper}>
          <p className={styles.additionalText}>
            <strong>Location:&nbsp;</strong> {excursion.location}
          </p>
          <p className={styles.additionalText}>
            <strong>Price:&nbsp;</strong> {excursion.price} €
          </p>
        </div>

        <h3 className={styles.additionalText}>Available Dates</h3>
        <div className={styles.calendarWrapper}>
          <DayPicker
            mode="single"
            selected={undefined}
            modifiers={{ available: availableDates }}
            modifiersClassNames={{ available: styles.highlight }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
