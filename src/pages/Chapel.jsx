import { useState } from "react";

import myGif from "/images/candle.gif";
import prayers from "../data/prayers.json"; // Import prayer data
import useTitle from "../hooks/useTitle";

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

  return (
    <aside className="daily-prayers-container">
      <h2 style={{ marginBottom: "20px" }}>Daily Prayers</h2>
      <div className="daily-prayers-grid">
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          return (
            <span
              key={day}
              className={`daily-prayer-day ${
                isToday(day) ? "highlighted" : ""
              }`}
              onClick={() => openModal(day)}>
              {day}
            </span>
          );
        })}
      </div>

      {/* Modal Component */}
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

const PrayerRequest = () => (
  <aside>
    <div style={{ textAlign: "center" }}>
      <h3>Prayer Requests (click to email)</h3>
      <a href="mailto:jimbro58@me.com">
        <img src={myGif} alt="Flickering candle" width="300px" />
      </a>
    </div>
  </aside>
);

const Chapel = () => {
  useTitle("Chapel");

  return (
    <main>
      <DailyPrayers />
      <section>
        <img src="/images/chapel_main.jpg" style={{ width: "100%" }} />
      </section>
      <PrayerRequest />
    </main>
  );
};

export default Chapel;
