import { useState } from "react";

import Modal from "../components/Modal";
import lighthouse from "/images/original/lighthouse.jpeg";
import elephant_oak from "/images/original/elephant_oak.jpg";
const superior_sunset = "/images/original/superior_sunset.JPG";

import Aside from "../components/Aside";

import writings from "../data/writings.json";

import { TabContent, TabbedSections } from "../components/TabbedSection";

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

const LeftAside = () => <Aside logo={true}></Aside>;

const CenterSection = () => (
  <section>
    <h2>Writings</h2>
    <TabbedSections tabs={tabs} />
  </section>
);

const RightAside = () => <Aside></Aside>;

const Writings = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Writings;
