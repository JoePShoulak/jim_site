import candleGif from "/images/candle.gif";
import chapelImage from "/images/chapel_main.jpg";

const Calendar = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate(); // Get today's day number

  return (
    <>
      <h3>Daily Prayers</h3>
      <div className="calendar">
        {days.map(day => (
          <div key={day} className={day == today ? "today" : ""}>
            {day}
          </div>
        ))}
      </div>
    </>
  );
};

const LeftAside = () => (
  <aside>
    <Calendar />
  </aside>
);

const CenterSection = () => (
  <section>
    <img src={chapelImage} alt="benches in light woods near a pond" />
  </section>
);

const RightAside = () => (
  <aside>
    <h3 id="prayer-request">
      Prayer Requests <br />
      (click to email)
    </h3>
    <a href="mailto:jimbro58@me.com">
      <img src={candleGif} alt="Flickering candle" width="300px" />
    </a>
  </aside>
);

const Chapel = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Chapel;
