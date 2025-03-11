import stole from "/images/original/stole.jpeg";
import jim_ordained from "/images/original/jim_ordained.jpeg";
import jim_laying_of_hands from "/images/original/jim_laying_of_hands.jpg";
import jim_uniform from "/images/original/jim_uniform.jpg";
import Image from "../components/Image";

import lighthouse from "/images/original/lighthouse.jpeg";
import elephant_oak from "/images/original/elephant_oak.jpg";
const superior_sunset = "/images/original/superior_sunset.JPG";

import Aside from "../components/Aside";
import { TabContent, TabbedSections } from "../components/TabbedSection";
import writings from "../data/writings.json";

const LeftAside = () => (
  <Aside logo={true}>
    <Image src={stole} />
    <Image src={jim_laying_of_hands} credit="Sarah Shoulak" />
  </Aside>
);

const tabs = [
  {
    label: "Poetry",
    content: (
      <TabContent
        content={writings.poetry}
        img={lighthouse}
        className="water-blue"
        imgAlt="a lighthouse"
      />
    ),
  },
  {
    label: "Prayers",
    content: (
      <TabContent
        content={writings.letters}
        img={elephant_oak}
        className="oak-green"
        imgAlt="a large oak tree"
      />
    ),
  },
  {
    label: "Commentaries",
    content: (
      <TabContent
        content={writings.writings}
        img={superior_sunset}
        className="sunset-orange"
        imgAlt="a sunset over lake superior"
      />
    ),
  },
];

const CenterSection = () => (
  <section>
    <h2>Diaconate</h2>
    <TabbedSections tabs={tabs} />
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
