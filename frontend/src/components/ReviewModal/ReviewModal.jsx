import React from "react";
import { useNavigate } from "react-router-dom";

const ReviewModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBackgroundClick = () => {
    onClose();
    navigate("/");
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      style={{ backgroundColor: "rgba(255, 191, 0, 0.5)" }}
      className="fixed inset-0 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md mx-2"
        onClick={handleModalClick}
      >
        <button
          onClick={handleBackgroundClick}
          className="text-right w-full mb-4"
        >
          Close ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
        <form>
          <input
            type="text"
            placeholder="Title"
            required
            className="w-full mb-3 p-2 border rounded"
          />
          <textarea
            placeholder="Review"
            required
            className="w-full mb-3 p-2 border rounded"
            rows={4}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send it
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
