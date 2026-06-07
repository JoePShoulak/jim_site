import { useState } from "react";
import ContactForm from "../components/ContactForm";

import scribe from "/images/original/scribe.png";
import signature from "/images/original/signature.png";
import joe from "/images/original/Joe.jpg";

import Aside from "../components/Aside";

const LeftAside = () => (
  <Aside>
    <p>
      Jim Shoulak was born and raised in Wisconsin. He's been married to Judy
      for 41 years; they currently live in Minnesota and have three children.
      Jim was ordained a deacon in the Episcopal Church on July 29th, 2010. He
      served two parish assignments and now, in his retirement, is privileged to
      serve as chaplain for his local police department.
      <br />
      <br />
      "For many years I dreamed of assembling a prayer routine based on the
      Ordination Vows of a Deacon - of course, with a focused theme of service.
      With the computer help of my son Joe P. Shoulak, this is the result! I
      pray that this site will 'be a service' to you!"
      <br />
      <br />
      Peace and blessings,
    </p>
    <img className="contact-signature" src={signature} alt="Jim signature" />
  </Aside>
);

const CenterSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section className="contact-section">
      <img className="contact-scribe" src={scribe} alt="Scribe writing" />

      <button onClick={() => setIsContactOpen(true)}>Contact Us</button>

      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </section>
  );
};

const RightAside = () => (
  <Aside folkMusic>
    <div className="contact-thank-you">
      <img src={joe} alt="Joe P. Shoulak" />
      <p>
        "A special thank you to my son, Joe P Shoulak, for his countless hours
        of expertise, suggestions and support for this project."
      </p>
      <p>-Joe's Dad</p>
    </div>
  </Aside>
);

const Contact = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Contact;
