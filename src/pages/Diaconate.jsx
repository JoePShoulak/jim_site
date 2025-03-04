import stole from "/images/original/stole.jpeg";
import jim_ordained from "/images/original/jim_ordained.jpeg";
import jim_laying_of_hands from "/images/original/jim_laying_of_hands.jpg";
import jim_uniform from "/images/original/jim_uniform.jpg";
import Image from "../components/Image";

const LeftAside = () => <aside></aside>;

const CenterSection = () => (
  <section>
    <h2>Diaconate</h2>
    <div className="two-column-content">
      <div className="column">
        <Image src={stole} />
        <Image src={jim_laying_of_hands} credit="Sarah Shoulak" />
        <Image src={jim_ordained} credit="Judy Shoulak" />
      </div>
      <div className="column">
        <img src={jim_uniform} alt="Jim in uniform" />
        <p className="credit">Credit: Steve Emerson</p>
      </div>
    </div>
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
