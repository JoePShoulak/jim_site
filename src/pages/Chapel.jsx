import { useState } from "react";

import myGif from "../images/candle.gif";
import prayers from "../data/prayers.json"; // Import prayer data

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  dailyPrayers: {
    grid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: "200px",
      margin: "auto",
    },
  },
};

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

  const dayNumberStyle = day => ({
    textDecoration: "none",
    color: isToday(day) ? "red" : "black", // Highlight current day
    fontWeight: isToday(day) ? "bold" : "normal",
    margin: "5px",
    fontSize: "18px",
    cursor: "pointer", // Makes it clear it's clickable
  });

  return (
    <aside style={styles.container}>
      <h2>Daily Prayers</h2>
      <div style={styles.dailyPrayers.grid}>
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          return (
            <span
              key={day}
              style={dayNumberStyle(day)}
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
          style={modalStyle}
          onClick={handleOutsideClick}>
          <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <h2>{selectedPrayer.title}</h2>
            <p>{selectedPrayer.text}</p>
            <button onClick={closeModal} style={closeButtonStyle}>
              Close
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

// Modal Styling
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000, // Ensure modal is always on top
};

const modalContentStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  width: "80%",
  maxWidth: "400px",
  zIndex: 1001, // Ensure content is above background overlay
};

const closeButtonStyle = {
  marginTop: "10px",
  padding: "5px 10px",
  fontSize: "16px",
  cursor: "pointer",
};

const PrayerRequest = () => (
  <aside>
    <div style={{ textAlign: "center" }}>
      <h3>Prayer Requests (click to email)</h3>
      <img src={myGif} alt="Flickering candle" width="300px" />
    </div>
  </aside>
);

const Chapel = () => (
  <main>
    <DailyPrayers />
    <section>
      <div>
        <h1>Chapel</h1>
        <p>
          This is where you get your daily prayers and can submit prayer
          requests.
        </p>
      </div>
    </section>
    <PrayerRequest />
  </main>
);

export default Chapel;
