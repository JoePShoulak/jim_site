import useTitle from "../hooks/useTitle";
import footwashingImage from "/images/footwashing.png";
import signatureImage from "/images/signature.png";

// Sub-components
const Welcome = () => (
  <aside>
    <h3>Welcome!</h3>
    <p>
      I hope the time you spend here is beneficial. We invite persons of any
      denomination — or no church affiliation — to settle here for a while and
      enter into the spiritual presence of a Higher Power.
    </p>
    <img src={signatureImage} id="signature" alt="Jim's Signature" />
  </aside>
);

const MainImage = () => (
  <section>
    <img src={footwashingImage} alt="footwashing art" className="main-image" />
    <p className="label">Illustration by Joe G. Shoulak</p>
  </section>
);

const Disclaimer = () => (
  <aside>
    <p>
      Scripture quotations are from New Revised Standard Version Bible,
      copyright © 1989 National Council of the Churches of Christ in the United
      States of America. Used by permission. All rights reserved worldwide.
    </p>
    <p>
      Book of Common Prayer (BCP) — Church Publishing Incorporated, New York
      [Public Domain]
    </p>
    <p>
      All other content (text, illustrations, photographs and music) - unless
      attributed to others - is the work of the author.
    </p>
    <p> No part of this website was written or designed by AI.</p>
  </aside>
);

// Main
const Home = () => {
  useTitle("Home");

  return (
    <>
      <main>
        <Welcome />
        <MainImage />
        <Disclaimer />
      </main>
    </>
  );
};

export default Home;
