import styles from "./bookModal.module.css";
import "react-day-picker/dist/style.css";
import { useRef, useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "../../utils/customDateSelector";

const BookModal = ({ excursion, onClose, availableDates }) => {
  console.log(availableDates);

  const options = availableDates.map((d) => ({
    value: d.toISOString(),
    label: d.toLocaleDateString(),
  }));

  const modalRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(
    availableDates.length ? availableDates[0] : null
  );

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
        <h2 className={styles.title}>{`Book ${excursion.title}?`}</h2>
        <div className={styles.textWrapper}>
          <p>{excursion.description}</p>
          <label htmlFor="dateSelect" className={styles.dateLabel}>
            Choose a date: &nbsp;
          </label>

          <Select
            options={options}
            value={options.find((o) => o.value === selectedDate?.toISOString())}
            onChange={(opt) => setSelectedDate(new Date(opt.value))}
            styles={customStyles}
          />
        </div>

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

export default BookModal;
