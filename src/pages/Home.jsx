import footwashingImage from "/images/footwashing.png";
import signatureImage from "/images/signature.png";

// Styles
const styles = {
  welcome: {
    title: { fontFamily: "Tangerine, serif", fontSize: "50px" },
    paragraph: { marginBottom: "50px" },
    image: {
      width: "80%",
      maxWidth: "300px",
      height: "auto",
      display: "block",
      marginBottom: "50px",
    },
  },
  mainImage: {
    image: {
      height: "auto",
      width: "100%",
      display: "block",
    },
    attribution: { justifySelf: "right", fontFamily: "RomanAntique, serif" },
  },
};

// Sub-components
const Welcome = () => (
  <aside>
    <h3 style={styles.welcome.title}>Welcome!</h3>
    <p style={styles.welcome.paragraph}>
      I hope the time you spend here is beneficial. We invite persons of any
      denomination — or no church affiliation — to settle here for a while and
      enter into the spiritual presence of a Higher Power.
    </p>
    <img
      src={signatureImage}
      alt="Jim's Signature"
      style={styles.welcome.image}
    />
  </aside>
);

const MainImage = () => (
  <section>
    <img
      src={footwashingImage}
      alt="footwashing art"
      style={styles.mainImage.image}
    />
    <p style={styles.mainImage.attribution}>Illustration by Joe G. Shoulak</p>
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
const Home = () => (
  <>
    <main>
      <Welcome />
      <MainImage />
      <Disclaimer />
    </main>
  </>
);

export default Home;
