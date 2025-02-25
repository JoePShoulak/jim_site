import { useState } from "react";
import Modal from "./Modal";
import prayers from "../data/prayers.json";

const Calendar = () => {
  const [day, setDay] = useState(null);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();

  const CalendarDay = props => (
    <div
      key={props.day}
      className={props.day == today ? "today" : ""}
      onClick={() => setDay(props.day)}>
      {props.day}
    </div>
  );

  const PrayerModal = () => {
    const prayer = prayers[day - 1];

    return (
      <Modal title={prayer.title} onClose={() => setDay(null)}>
        <p>{prayer.text}</p>
      </Modal>
    );
  };

  return (
    <>
      <h3>Daily Prayers</h3>
      <div className="calendar">
        {days.map(d => (
          <CalendarDay key={d} day={d} />
        ))}
      </div>
      {day && <PrayerModal />}
    </>
  );
};

export { Calendar };
