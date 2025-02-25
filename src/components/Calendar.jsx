import { useState } from "react";
import Modal from "./Modal";
import prayers from "../data/prayers.json";

const PrayerModal = ({ day, onClose }) => (
  <Modal title={`Prayer for day ${day}`} onClose={onClose}>
    <p>{prayers[day - 1].text}</p>
  </Modal>
);

const Calendar = () => {
  const [day, setDay] = useState(null);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();

  return (
    <>
      <h3>Daily Prayers</h3>
      <div className="calendar">
        {days.map(day => (
          <div
            key={day}
            className={day == today ? "today" : ""}
            onClick={() => setDay(day)}>
            {day}
          </div>
        ))}
      </div>
      {day && <PrayerModal day={day} onClose={() => setDay(null)} />}
    </>
  );
};

export { Calendar };
