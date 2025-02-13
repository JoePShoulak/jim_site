/* eslint-disable react/prop-types */
import { useState } from "react";
import prayers from "../data/prayers.json"; // Import prayer data
import Modal from "../components/Modal"; // Import the new Modal component

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

      {/* Use the extracted Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedPrayer?.title}
        content={selectedPrayer?.text}
      />
    </aside>
  );
};

export { DailyPrayers };
