import useTitle from "../hooks/useTitle";
import lighthouse from "/images/lighthouse.jpeg";
import elephant_oak from "/images/elephant_oak.jpg";
const superior_sunset = "/images/superior_sunset.JPG";

import { WATER_BLUE, OAK_GREEN, SUNSET_ORANGE } from "../assets/colors";

// TODO: Replace this all with a tabbed main section

const ImageAside = ({ image, color, label }) => (
  <aside className="image-aside">
    <div>
      <img src={image} />
      <h1 style={{ color }}>{label}</h1>
    </div>
  </aside>
);

const imageContents = [
  {
    image: lighthouse,
    color: WATER_BLUE,
    label: "Sermon Excerpts by Scripture",
  },
  { image: elephant_oak, color: OAK_GREEN, label: "Reflections and Poetry" },
  { image: superior_sunset, color: SUNSET_ORANGE, label: "Humble Prayers" },
];

const Writings = () => {
  useTitle("Writings");

  return (
    <main>
      {imageContents.map((content, i) => (
        <ImageAside key={i} {...content} />
      ))}
    </main>
  );
};

export default Writings;
