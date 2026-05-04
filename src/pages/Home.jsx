import footwashingImage from "/images/original/footwashing.png";
import signatureImage from "/images/original/signature.png";
import jim_headshot from "/images/original/jim_headshot.jpeg";
import headshot2 from "/images/original/headshot2.png";

import Aside from "../components/Aside";

const LeftAside = () => (
  <Aside>
    <h3>Welcome!</h3>
    <p>
      I hope the time you spend here is beneficial. We invite persons of any
      denomination — or no church affiliation — to settle here for a while and
      enter into the spiritual presence of a Higher Power.
    </p>
    <img src={signatureImage} alt="signature" />
    <img src={headshot2} style={{ paddingTop: "30px" }} />
    <p>
      Jim Shoulak is a retired deacon in the Episcopal Diocese of Minnesota. He
      currently serves as chaplain of the Corcoran, Minnesota, police
      department.
    </p>
  </Aside>
);

const CenterSection = () => (
  <section
    style={{
      display: "flex",
      flexDirection: "column",
    }}>
    <img src={footwashingImage} alt="footwashing art" />
    <p style={{ marginTop: "auto", fontSize: 10 }}>
      Scripture quotations are from New Revised Standard Version Bible,
      copyright © 1989 National Council of the Churches of Christ in the United
      States of America. Used by permission. All rights reserved worldwide. Book
      of Common Prayer (BCP) - Church Publishing Incorporated, New York [Public
      Domain] All other content (text, illustrations, photographs and music) -
      unless attributed to others - is the work of the author. Clipart used in
      main site logo Credit: ID 234547372 and ID 234136361 © Alona Zhitnaya in
      UKRAINE. | dreamstime.com | Used by Permission
    </p>
  </section>
);

const RightAside = () => (
  <Aside>
    <h3>A Word About Inclusivity</h3>
    <p>
      I had intended to make this website entirely gender inclusive. However,
      the sources I cite (The Revised Standard Version of the Bible and the
      Episcopal Book of Common Prayer) do not utilize complete inclusive
      language. To stay in compliance with each of their copyright protections,
      regretfully, I have used such citations "as is," and look forward to
      future versions of these works to be updated to better reflect the lives
      and lifestyles of all persons.
    </p>
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
