import myGif from "/images/candle.gif";
import useTitle from "../hooks/useTitle";
import { DailyPrayers } from "../components/DailyPrayers";

const ChapelImage = () => (
  <section>
    <img src="/images/chapel_main.jpg" className="full-width" />
  </section>
);

const PrayerRequest = () => (
  <aside>
    <div className="centered-text">
      <h3 id="prayer-request">
        Prayer Requests <br />
        (click to email)
      </h3>
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
      <ChapelImage />
      <PrayerRequest />
    </main>
  );
};

export default Chapel;
