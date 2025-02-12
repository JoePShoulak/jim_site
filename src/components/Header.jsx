import logo from "/images/logo.png";
import stole from "/images/stole.png";

import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const pageName =
    location.pathname.replace("/", "").replace("_", " ").toUpperCase() ||
    "HOME";

  return (
    <header>
      <Link to="/">
        <img src={logo} className="drop-image" id="left" alt="Chapel Logo" />
      </Link>

      <div id="banner">
        <h1 id="title">Chapel of St. Stephen</h1>
        <h2 id="subtitle">
          For Deacons and other Servant Leaders
          <br />
          who serve the least, the last, and the lost
        </h2>
      </div>
      <img src={stole} className="drop-image" id="right" alt="Stole" />
      <div id="page-name">{pageName}</div>
    </header>
  );
};

export { Header };
