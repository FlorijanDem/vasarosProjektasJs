import styles from "./modals.module.css";
import { useRef, useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "../../utils/customDateSelector";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const BookModal = ({ excursion, onClose, availableDates, userId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(
    availableDates.length ? availableDates[0] : null
  );

  const options = availableDates.map((d) => ({
    value: d.toISOString(),
    label: d.toLocaleDateString(),
  }));

  const toYMD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const handleConfirm = async () => {
    if (!selectedDate) return;

    try {
      setSubmitting(true);
      setError("");

      const body = {
        user_id: userId,
        tour_id: excursion.id,
        selected_date: toYMD(selectedDate),
        status: "pending",
      };

      const res = await axios.post(`${API_URL}/reservations`, body, {
        withCredentials: true,
      });

      if (res.data?.status === "success") {
        onClose();
      } else {
        throw new Error(
          res.data?.message || "Booking failed. Please try later."
        );
      }
    } catch (error) {
      const errors = error.response?.data?.errors;
      setError(
        error.response?.data?.message ||
          (Array.isArray(errors)
            ? errors.map((e) => e.msg).join("\n")
            : "Booking failed. Please try later.")
      );
    } finally {
      setSubmitting(false);
    }
  };

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
            inputId="dateSelect"
            options={options}
            value={options.find((o) => o.value === selectedDate?.toISOString())}
            onChange={(opt) => setSelectedDate(new Date(opt.value))}
            styles={customStyles}
          />

          {error && <p className={styles.error}>{error}</p>}
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
          <button
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={!selectedDate || submitting}
          >
            {submitting ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
