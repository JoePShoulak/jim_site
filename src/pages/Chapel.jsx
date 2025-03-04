import { useState } from "react";
import candleGif from "/images/original/candle.gif";
import chapelImage from "/images/original/chapel_main.jpg";
import logo from "/images/original/logo.png";

import { Calendar } from "../components/Calendar";
import Image from "../components/Image";
import ContactForm from "../components/ContactForm";

const LeftAside = () => (
  <aside>
    <Image src={logo} />
    <Calendar />
    <p>
      Each of the 31-Day Prayer Walk features an inspiring photograph, an
      invitation to prayer, a Psalm excerpt and another Bible quotation, a
      section from the Ordination Rite for Deacons (in the BCP), and a final
      prayer or reflection. Start anywhere you’d like — there are no rules in
      your chapel! May the Spirit be with you as you take time for a short
      spiritual journey.
    </p>
  </aside>
);

const Chapel = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <LeftAside />
      <section>
        <h2>Chapel</h2>
        <img src={chapelImage} alt="benches in light woods near a pond" />
      </section>
      <aside>
        <h3 id="prayer-request">Prayer Requests</h3>
        <img
          src={candleGif}
          alt="Flickering candle"
          width="300px"
          style={{ cursor: "pointer" }}
          onClick={() => setIsContactOpen(true)}
        />
        <p>
          Click on the candle if you'd like to leave a prayer request for us and
          our prayer support friends.
        </p>
      </aside>

      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSubject="Prayer Request"
      />
    </>
  );
};

export default Chapel;
