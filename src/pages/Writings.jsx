import useTitle from "../hooks/useTitle";
import lighthouse from "/images/lighthouse.jpeg";
import elephant_oak from "/images/elephant_oak.jpg";
const superior_sunset = "/images/superior_sunset_3.JPG";

import { WATER_BLUE, OAK_GREEN, SUNSET_ORANGE } from "../assets/colors";

const Writings = () => {
  useTitle("Writings");

  return (
    <main>
      <aside style={{ width: "33%" }}>
        <div style={{ textAlign: "center" }}>
          <img src={lighthouse} style={{ width: "100%" }} />
          <h1 style={{ color: WATER_BLUE }}>Sermon Excerpts by Scripture</h1>
        </div>
      </aside>
      <section style={{ width: "33%" }}>
        <div style={{ textAlign: "center" }}>
          <img src={elephant_oak} style={{ width: "100%" }} />
          <h1 style={{ color: OAK_GREEN }}>Reflections and Poetry</h1>
        </div>
      </section>
      <aside style={{ width: "33%" }}>
        <div style={{ textAlign: "center" }}>
          <img src={superior_sunset} style={{ width: "100%" }} />
          <h1 style={{ color: SUNSET_ORANGE }}>Humble Prayers</h1>
        </div>
      </aside>
    </main>
  );
};

export default Writings;
