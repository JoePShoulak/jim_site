import { useState } from "react";
import Modal from "./Modal";

const Calendar = () => {
  const [day, setDay] = useState(null);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();
  const prayerImage = day =>
    `/images/prayers/day-${String(day).padStart(2, "0")}.png`;

  const CalendarDay = props => (
    <div
      key={props.day}
      className={props.day == today ? "today" : ""}
      onClick={() => setDay(props.day)}>
      {props.day}
    </div>
  );

  const PrayerModal = () => {
    const image = prayerImage(day);

    return (
      <Modal
        onClose={() => setDay(null)}
        className="image-modal prayer-modal"
        showCloseButton={false}
      >
        <div className="image-modal-scroll">
          <img
            className="modal-image"
            src={image}
            alt={`Prayer for day ${day}`}
          />
        </div>
        <div className="image-modal-actions">
          <a
            className="image-download"
            href={image}
            download={`day-${String(day).padStart(2, "0")}.png`}
          >
            Download image
          </a>
          <button onClick={() => setDay(null)}>Close</button>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <h3 className="prayer-walk-title">Prayer Walk Days</h3>
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
