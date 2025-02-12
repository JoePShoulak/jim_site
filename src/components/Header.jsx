import logo from "../images/logo.png";
import stole from "../images/stole.png";
import bishopCross from "../images/bishop-cross.png";

import { Link, useLocation } from "react-router-dom";

const dropImageStyle = {
  position: "absolute",
  width: "auto",
};

const styles = {
  header: {
    width: "calc(100%-20px)",
    height: "200px",
    marginBottom: "100px",
    background: "#fff", // White background
    color: "black",
    padding: "20px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "8px solid black", // Thick black border
    position: "relative",
  },
  logo: {
    ...dropImageStyle,
    top: "30px",
    left: "20px",
    height: "250px",
    marginLeft: "15px",
  },
  stole: {
    ...dropImageStyle,
    top: "40px",
    right: "20px",
    height: "250px",
    marginRight: "15px",
  },
  banner: {
    flexGrow: 1,
    height: "160px",
    textAlign: "center",
    backgroundImage: `url(${bishopCross})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  text: {
    fontFamily: "RomanAntique, serif",
    fontSize: "64px",
  },
  subText: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  pageOverlay: {
    position: "absolute",
    top: "50%",
    right: "15%",
    transform: "translate(50%, -50%)",
    color: "black",
    fontSize: "48px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
};

const Header = () => {
  const location = useLocation();
  const pageName = location.pathname.replace("/", "").toUpperCase() || "HOME";

  return (
    <header style={styles.header}>
      <Link to="/">
        <img src={logo} alt="Chapel Logo" style={styles.logo} />
      </Link>
      <div style={styles.banner}>
        <h1 style={styles.text}>Chapel of St. Stephen</h1>
        <h2 style={styles.subText}>
          For Deacons and other Servant Leaders
          <br />
          who serve the least, the last, and the lost
        </h2>
      </div>
      <img src={stole} alt="Stole" style={styles.stole} />
      <div style={styles.pageOverlay}>{pageName}</div>
    </header>
  );
};

export { Header };
