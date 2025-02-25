import candleGif from "/images/candle.gif";
import chapelImage from "/images/chapel_main.jpg";
import { Calendar } from "../components/Calendar";

const LeftAside = () => (
  <aside>
    <Calendar />
  </aside>
);

const CenterSection = () => (
  <section>
    <h2>Chapel</h2>
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
