import useTitle from "../hooks/useTitle";
import elephant_oak from "/images/elephant_oak.jpg";

const Writings = () => {
  useTitle("Writings");

  return (
    <main>
      <aside style={{ width: "33%" }}>
        <div style={{ textAlign: "center" }}>
          <img src={elephant_oak} style={{ width: "100%" }} />
          <h1>Sermon Excerpts by Scripture</h1>
        </div>
      </aside>
      <section style={{ width: "33%" }}>
        <div style={{ textAlign: "center" }}>
          <img src={elephant_oak} style={{ width: "100%" }} />
          <h1>Reflections and Poetry</h1>
        </div>
      </section>
      <aside style={{ width: "33%" }}>
        <div style={{ textAlign: "center" }}>
          <img src={elephant_oak} style={{ width: "100%" }} />
          <h1>Sermon Excerpts by Scripture</h1>
        </div>
      </aside>
    </main>
  );
};

export default Writings;
