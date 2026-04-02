import { useState } from "react";
import candleGif from "/images/original/candle.gif";
import chapelImage from "/images/original/chapel_main.jpg";
import logo from "/images/original/logo.png";

import { Calendar } from "../components/Calendar";
import Image from "../components/Image";
import ContactForm from "../components/ContactForm";
import Aside from "../components/Aside";

const LeftAside = () => (
  <Aside>
    <Image src={logo} style={{ width: "60%", justifySelf: "center" }} />
    <p>
      Each day of this 31-Day Prayer Walk features an inspiring photograph,
      verses from Scripture, and a short commentary.
      <br />
      <br />
      The core of this experience are excerpts from the{" "}
      <b>Ordination Rite for Deacons</b> from the Episcopal Book of Common
      Prayer (BCP), that are reprinted in order through all 31 days.{" "}
      <i>
        [Unless otherwise noted, all quotes from the Ordination Rite are spoken
        by the Bishop.]
      </i>
      <br />
      <br />
      Servant Leaders from any walk of life may find this exercise beneficial.
      <br />
      <br />
      May the Spirit be with you as you take time for a short spiritual journey.
    </p>
  </Aside>
);

const Chapel = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <LeftAside />
      <section>
        <h2>Chapel</h2>
        <img src={chapelImage} alt="benches in light woods near a pond" />
        <Calendar />
      </section>
      <Aside>
        <h3 id="prayer-request">Prayer Requests</h3>
        <img
          src={candleGif}
          alt="Flickering candle"
          width="300px"
          style={{ paddingBottom: "30px" }}
        />
        <button onClick={() => setIsContactOpen(true)}>Contact Us</button>
      </Aside>

      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject="Prayer Request"
      />
    </>
  );
};

export default Chapel;
