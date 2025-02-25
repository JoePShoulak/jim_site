import { useState } from "react";
import Modal from "../components/Modal"; // Adjust the path as needed
import lighthouse from "/images/lighthouse.jpeg";
import elephant_oak from "/images/elephant_oak.jpg";
const superior_sunset = "/images/superior_sunset.JPG";

import TabbedSections from "../components/TabbedSection";
import writings from "../data/writings.json";

const rootStyles = getComputedStyle(document.documentElement);
const blue = rootStyles.getPropertyValue("--water-blue").trim();
const green = rootStyles.getPropertyValue("--oak-green").trim();
const orange = rootStyles.getPropertyValue("--sunset-orange").trim();

const TabContent = ({ content, img, imgAlt, color }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const ModalLink = ({ item }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <p>
        <a
          onClick={() => setSelectedItem(item)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ color: hovered ? color : "black" }}>
          {item.title}
        </a>
      </p>
    );
  };

  return (
    <div className="two-column-content">
      <div className="column">
        {content.map((item, i) => (
          <ModalLink key={i} item={item} />
        ))}
      </div>
      <div className="column">
        <img src={img} alt={imgAlt} />
      </div>
      {selectedItem && (
        <Modal title={selectedItem.title} onClose={() => setSelectedItem(null)}>
          <p>{selectedItem.content}</p>
        </Modal>
      )}
    </div>
  );
};

const tabs = [
  {
    label: "Poetry",
    content: (
      <TabContent
        content={writings.poetry}
        img={lighthouse}
        color={blue}
        imgAlt="a lighthouse"
      />
    ),
  },
  {
    label: "Essays",
    content: (
      <TabContent
        content={writings.letters}
        img={elephant_oak}
        color={green}
        imgAlt="a large oak tree"
      />
    ),
  },
  {
    label: "Short Stories",
    content: (
      <TabContent
        content={writings.writings}
        img={superior_sunset}
        color={orange}
        imgAlt="a sunset over lake superior"
      />
    ),
  },
];

const LeftAside = () => <aside>Left Aside</aside>;

const CenterSection = () => (
  <section>
    <TabbedSections tabs={tabs} />
  </section>
);

const RightAside = () => <aside>Right Aside</aside>;

const Writings = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Writings;
