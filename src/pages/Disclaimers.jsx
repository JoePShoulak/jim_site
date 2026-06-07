import Aside from "../components/Aside";

const LeftAside = () => <Aside logo={true} />;

const CenterSection = () => (
  <section>
    <h2>Disclaimers</h2>
    <p className="credit">
      Scripture quotations are from New Revised Standard Version Bible,
      copyright (c) 1989 National Council of the Churches of Christ in the
      United States of America. Used by permission. All rights reserved
      worldwide.
    </p>
    <p className="credit">
      Book of Common Prayer (BCP) - Church Publishing Incorporated, New York
      [Public Domain]
    </p>
    <p className="credit">
      All other content (text, illustrations, photographs and music) - unless
      attributed to others - is the work of the author.
    </p>
    <p className="credit">
      Clipart used in main site logo Credit: ID 234547372 and ID 234136361 (c)
      Alona Zhitnaya in UKRAINE. |{" "}
      <a className="link" href="http://www.dreamstime.com" target="_blank">
        dreamstime.com
      </a>{" "}
      | Used by Permission
    </p>
    <p className="credit">
      ALL CONTENT, aside from BCP excerpts, Scripture from the NRSV Bible, and
      select clipart is the property of Jim Shoulak. No permission is needed for
      the reprinting of content for personal, private use, or for a one-time
      usage in a small group gathering. For any larger reuse or reprinting,
      please request permission from the author.
    </p>
  </section>
);

const RightAside = () => <Aside folkMusic />;

const Disclaimers = () => (
  <>
    <LeftAside />
    <CenterSection />
    <RightAside />
  </>
);

export default Disclaimers;
