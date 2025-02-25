// import useTitle from "../hooks/useTitle";
// import lighthouse from "/images/lighthouse.jpeg";
// import elephant_oak from "/images/elephant_oak.jpg";
// const superior_sunset = "/images/superior_sunset.JPG";

// import { WATER_BLUE, OAK_GREEN, SUNSET_ORANGE } from "../assets/colors";

// // TODO: Replace this all with a tabbed main section

// const ImageAside = ({ image, color, label }) => (
//   <aside className="image-aside">
//     <div>
//       <img src={image} />
//       <h1 style={{ color }}>{label}</h1>
//     </div>
//   </aside>
// );

// const imageContents = [
//   {
//     image: lighthouse,
//     color: WATER_BLUE,
//     label: "Sermon Excerpts by Scripture",
//   },
//   { image: elephant_oak, color: OAK_GREEN, label: "Reflections and Poetry" },
//   { image: superior_sunset, color: SUNSET_ORANGE, label: "Humble Prayers" },
// ];

// const Writings = () => {
//   useTitle("Writings");

//   return (
//     <main>
//       {imageContents.map((content, i) => (
//         <ImageAside key={i} {...content} />
//       ))}
//     </main>
//   );
// };

import TabbedSections from "../components/TabbedSection";

const LeftAside = () => <aside>Left Aside</aside>;

const CenterSection = () => {
  const tabs = [
    {
      label: "Poetry",
      content: (
        <div>
          <h4>Poetry</h4>
          <p>This is some poetry content...</p>
        </div>
      ),
    },
    {
      label: "Essays",
      content: (
        <div>
          <h4>Essays</h4>
          <p>This is some essay content...</p>
        </div>
      ),
    },
    {
      label: "Short Stories",
      content: (
        <div>
          <h4>Short Stories</h4>
          <p>This is some short stories content...</p>
        </div>
      ),
    },
  ];

  return (
    <section>
      <TabbedSections tabs={tabs} />
    </section>
  );
};

const RightAside = () => <aside>Right Aside</aside>;

const Writings = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Writings;
