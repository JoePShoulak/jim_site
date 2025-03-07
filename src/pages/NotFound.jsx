import Aside from "../components/Aside";
import img404 from "/images/original/404.png";

const LeftAside = () => <Aside logo={true}></Aside>;

const CenterSection = () => (
  <section>
    <img src={img404} style={{ justifySelf: "center" }} />
  </section>
);

const RightAside = () => <Aside></Aside>;

const NotFound = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default NotFound;
