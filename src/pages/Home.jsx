import footwashingImage from "/images/original/footwashing.png";
import signatureImage from "/images/original/signature.png";
import stole from "/images/original/stole.jpeg";
import jim_headshot from "/images/original/jim_headshot.jpeg";

import Aside from "../components/Aside";

const LeftAside = () => (
  <Aside logo={true}>
    <h3>Welcome!</h3>
    <p>
      I hope the time you spend here is beneficial. We invite persons of any
      denomination — or no church affiliation — to settle here for a while and
      enter into the spiritual presence of a Higher Power.
    </p>
    <img src={signatureImage} id="signature" alt="Jim's Signature" />
    <img src={jim_headshot} style={{ paddingTop: "30px" }} />
  </Aside>
);

const CenterSection = () => (
  <section>
    <h2>Home</h2>
    <img src={footwashingImage} alt="footwashing art" />
  </section>
);

const RightAside = () => (
  <Aside>
    <img src={stole} />
  </Aside>
);

const Home = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Home;
