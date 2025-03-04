import img404 from "/images/original/404.png";

const LeftAside = () => <aside></aside>;

const CenterSection = () => (
  <section>
    <img src={img404} />
  </section>
);

const RightAside = () => <aside></aside>;

const NotFound = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default NotFound;
