import "./App.css";
import { GREEN } from "./colors";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { NavButton } from "./components/NavButton";

import footwashingImage from "./images/footwashing.png";
import signatureImage from "./images/signature.png";

function App() {
  return (
    <>
      <Header />
      <main>
        <aside>
          <h3>Welcome!</h3>
          <p>
            I hope the time you spend here is beneficial. We invite persons of
            any denomination — or no church affiliation — to settle here for a
            while and enter into the spiritual presence of a Higher Power.
          </p>
          <img
            src={signatureImage}
            alt="Jim's Signature"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              marginBottom: "50px",
            }}
          />
          <NavButton
            color={GREEN}
            title={"Stayin' Focused"}
            description={"Singer-Songwriter Jim's Secular Folk Music Site"}
          />
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
      <Footer />
    </>
  );
}

export default App;
