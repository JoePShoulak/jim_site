/* eslint-disable react/prop-types */
import prayers from "../data/prayers.json"; // Import prayer data
import { useState } from "react";

const DailyPrayers = () => {
  const [currentDay] = useState(new Date().getDate()); // Get today's day number
  const [selectedPrayer, setSelectedPrayer] = useState(null); // Stores the selected prayer
  const [isModalOpen, setModalOpen] = useState(false); // Controls modal visibility

  const isToday = day => day === currentDay;

  const openModal = day => {
    setSelectedPrayer(prayers[day]); // Fetch prayer from JSON
    setModalOpen(true); // Show modal
  };

  const closeModal = () => setModalOpen(false); // Hide modal

  const handleOutsideClick = event => {
    if (event.target.id === "modal-background") {
      closeModal();
    }
  };

  const CalendarDay = ({ day }) => {
    const classes = `daily-prayer-day ${isToday(day) ? "highlighted" : ""}`;

    return (
      <span className={classes} onClick={() => openModal(day)}>
        {day}
      </span>
    );
  };

  return (
    <aside className="daily-prayers-container">
      <h2>Daily Prayers</h2>
      <div className="daily-prayers-grid">
        {[...Array(31)].map((_, i) => (
          <CalendarDay key={i} day={i + 1} />
        ))}
      </div>

      {isModalOpen && selectedPrayer && (
        <div
          id="modal-background"
          className="modal-background"
          onClick={handleOutsideClick}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedPrayer.title}</h2>
            <p>{selectedPrayer.text}</p>
            <button onClick={closeModal} className="modal-button">
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export { DailyPrayers };
