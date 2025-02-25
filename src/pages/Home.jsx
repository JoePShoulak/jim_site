import footwashingImage from "/images/footwashing.png";
import signatureImage from "/images/signature.png";

const Welcome = () => (
  <>
    <h3>Welcome!</h3>
    <p>
      I hope the time you spend here is beneficial. We invite persons of any
      denomination — or no church affiliation — to settle here for a while and
      enter into the spiritual presence of a Higher Power.
    </p>
    <img src={signatureImage} id="signature" alt="Jim's Signature" />
  </>
);

const MainImage = () => (
  <>
    <img src={footwashingImage} alt="footwashing art" />
    <p>Illustration by Joe G. Shoulak</p>
  </>
);

const Disclaimer = () => (
  <>
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
  </>
);

const Home = () => {
  return (
    <main>
      <aside>
        <Welcome />
      </aside>
      <section>
        <MainImage />
      </section>
      <aside>
        <Disclaimer />
      </aside>
    </main>
  );
};

export default Home;
