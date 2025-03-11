import { useState } from "react";
import ContactForm from "../components/ContactForm";

import jim_headshot from "/images/original/headshot2.png";
import scribe from "/images/original/scribe.png";

import Aside from "../components/Aside";
import Image from "../components/Image";

const LeftAside = () => (
  <Aside logo={true}>
    <Image src={jim_headshot} />
  </Aside>
);

const CenterSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section>
      <h2>About</h2>

      <div className="two-column-content">
        <div className="column">
          <p>
            Jim Shoulak was born and raised in Wisconsin. He's been married to
            Judy for 40 years, and they have 3 children. They currently live in
            Minnesota. Jim was ordained a deacon in the Episcopal Church on July
            29th, 2010. He served two parishes and now is privileged to serve as
            chaplain for his local police department.
            <br />
            <br />
            <em>
              “For many years I dreamed of assembling a prayer routine based on
              the Ordination Vows of a Deacon — of course with a focused theme
              of service. With the computer help of my son Joe P. Shoulak, this
              is the result! I pray that this site will 'be a service' to you!”
            </em>
            <br />
            <br />
            Peace and blessings, Jim
          </p>
        </div>
        <div className="column">
          <img src={scribe}></img>
          <button onClick={() => setIsContactOpen(true)}>Contact Us</button>
        </div>
      </div>
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </section>
  );
};

const RightAside = () => <Aside></Aside>;

const Contact = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Contact;
