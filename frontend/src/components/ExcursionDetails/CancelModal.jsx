import styles from "./modals.module.css";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const CancelModal = ({ reservationId, onClose, onSuccess }) => {
  const modalRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    try {
      setSubmitting(true);
      setError("");

      await axios.delete(`${API_URL}/reservations/${reservationId}`, {
        withCredentials: true,
      });

      onSuccess?.(); // triggers parent to refetch reservations
      onClose();
    } catch (e) {
      setError(
        e.response?.data?.message || "Cancellation failed. Please try later."
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
        <h2 className={styles.title}>Cancel Reservation?</h2>

        <div className={styles.textWrapper}>
          <p>
            Do you really want to cancel your excursion? Once cancelled, it
            cannot be reversed.
          </p>
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
          <button className={styles.confirmBtn} onClick={handleConfirm} disabled={submitting}>
            {submitting ? "Cancelling..." : "Cancel Reservation"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
