import stole from "/images/original/stole.jpeg";
import jim_ordained from "/images/original/jim_ordained.jpeg";
import jim_laying_of_hands from "/images/original/jim_laying_of_hands.jpg";
import jim_uniform from "/images/original/jim_uniform.jpg";
import Image from "../components/Image";

import Aside from "../components/Aside";

const LeftAside = () => (
  <Aside logo={true}>
    <Image src={stole} />
    <Image src={jim_laying_of_hands} credit="Sarah Shoulak" />
  </Aside>
);

const CenterSection = () => (
  <section>
    <h2>Diaconate</h2>
  </section>
);

const RightAside = () => (
  <Aside>
    <Image src={jim_ordained} credit="Judy Shoulak" />
    <Image src={jim_uniform} credit="Steve Emerson" />
  </Aside>
);

const Diaconate = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Diaconate;
