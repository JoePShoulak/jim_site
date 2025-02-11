import "./App.css";

import { NavButton } from "./components/NavButton";

import footwashingImage from "./images/footwashing.png";

function App() {
  return (
    <>
      <header>
        <h1>Chapel of St. Stephen</h1>
        <h2>
          For Deacons and other Servant Leaders who serve the least, the last,
          and the lost
        </h2>
      </header>
      <main>
        <aside>
          <h3>Welcome!</h3>
          <p>
            I hope the time you spend here is beneficial. We invite persons of
            any denomination — or no church affiliation — to settle here for a
            while and enter into the spiritual presence of a Higher Power.
          </p>
        </aside>
        <section>
          <img
            src={footwashingImage}
            alt="footwashing art"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <p style={{ justifySelf: "right" }}>Illustration by Joe G. Shoulak</p>
        </section>
        <aside>
          <p>
            Scripture quotations are from New Revised Standard Version Bible,
            copyright © 1989 National Council of the Churches of Christ in the
            United States of America. Used by permission. All rights reserved
            worldwide.
          </p>
          <p>
            Book of Common Prayer (BCP) — Church Publishing Incorporated, New
            York [Public Domain]
          </p>
          <p>
            All other content (text, illustrations, photographs and music) -
            unless attributed to others - is the work of the author.
          </p>
          <p> No part of this website was written or designed by AI.</p>
        </aside>
      </main>
      <footer>
        <NavButton title={"Chapel"} />
        <NavButton title={"Jim's Writings"} />
        <NavButton title={"Jim's Hymms"} />
        <NavButton title={"The Diaconate"} />
        <NavButton title={"Gift Shop"} />
        <NavButton title={"Info & Contact"} />
      </footer>
      <footer className="minor-footer">Made by Joe P. Shoulak - 2025</footer>
    </>
  );
}

export default App;
