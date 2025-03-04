import footwashingImage from "/images/original/footwashing.png";
import signatureImage from "/images/original/signature.png";

const LeftAside = () => (
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

const CenterSection = () => (
  <section>
    <h2>Home</h2>
    <img src={footwashingImage} alt="footwashing art" />
  </section>
);

const RightAside = () => (
  <aside id="disclaimer">
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
    <br />
    <p class="credit">
      Clipart used in main site logo Credit: ID 234547372 and ID 234136361 ©
      Alona Zhitnaya in UKRAINE. |{" "}
      <a class="link" href="http://www.dreamstime.com" target="_blank">
        dreamstime.com
      </a>{" "}
      | Used by Permission
    </p>
  </aside>
);

const Home = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Home;
