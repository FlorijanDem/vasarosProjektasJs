import styles from "./modals.module.css";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { customStyles } from "../../utils/customDateSelector";
import Select from "react-select";

const API_URL = import.meta.env.VITE_API_URL;

const ReviewModal = ({ onClose, excursion, onSuccess }) => {
  const modalRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const ratingOptions = [
    { value: 5, label: "★★★★★ (5)" },
    { value: 4, label: "★★★★☆ (4)" },
    { value: 3, label: "★★★☆☆ (3)" },
    { value: 2, label: "★★☆☆☆ (2)" },
    { value: 1, label: "★☆☆☆☆ (1)" },
  ];
  const [rating, setRating] = useState(ratingOptions[0]);
  const [comment, setComment] = useState("");

  const handleConfirm = async () => {
    console.log(rating);

    try {
      setSubmitting(true);
      setError("");

      const body = {
        tour_id: excursion.id,
        rating: rating.value,
        comment: comment,
      };

      const res = await axios.post(`${API_URL}/reviews`, body, {
        withCredentials: true,
      });

      if (res.data?.status === "success") {
        onSuccess?.();
        onClose();
      } else {
        throw new Error(
          res.data?.message || "Adding review failed. Please try later."
        );
      }
    } catch (error) {
      const errors = error.response?.data?.errors;
      setError(
        error.response?.data?.message ||
          (Array.isArray(errors)
            ? errors.map((e) => e.msg).join("\n")
            : "Adding review failed. Please try later.")
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
        <h2 className={styles.title}>Leave a Review</h2>

        <p className={styles.textWrapper}>
          Tell us about your excursion. Your feedback helps us improve and helps
          future travelers know what to expect.
        </p>

        <div className={styles.formGroup}>
          <label htmlFor="ratingSelect">Rating:</label>
          <Select
            inputId="ratingSelect"
            options={ratingOptions}
            value={rating}
            onChange={setRating}
            styles={customStyles}
            placeholder="Choose rating..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment">Comment:</label>
          <textarea
            className={styles.comment}
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={submitting}
            placeholder="Write your experience..."
            maxLength={300}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
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
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
