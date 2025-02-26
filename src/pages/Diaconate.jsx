import stole from "/images/original/stole.png";

const LeftAside = () => <aside></aside>;

const CenterSection = () => (
  <section>
    <h2>Diaconate</h2>
    <img src={stole} alt="a red deacon's stole"></img>
  </section>
);

const RightAside = () => <aside></aside>;

const Diaconate = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Diaconate;
