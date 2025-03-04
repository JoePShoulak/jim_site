import { useState } from "react";

import Modal from "../components/Modal";
import lighthouse from "/images/original/lighthouse.jpeg";
import elephant_oak from "/images/original/elephant_oak.jpg";
const superior_sunset = "/images/original/superior_sunset.JPG";

import TabbedSections from "../components/TabbedSection";

import writings from "../data/writings.json";

const TabContent = ({ content, img, imgAlt, className }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const ModalLink = ({ item }) => {
    const [hovered, setHovered] = useState(className);

    return (
      <p>
        <a
          onClick={() => setSelectedItem(item)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={className}>
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

const LeftAside = () => <aside></aside>;

const CenterSection = () => (
  <section>
    <h2>Writings</h2>
    <TabbedSections tabs={tabs} />
  </section>
);

const RightAside = () => <aside></aside>;

const Writings = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Writings;
