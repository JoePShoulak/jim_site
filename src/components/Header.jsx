import logo from "../images/logo.png";
import stole from "../images/stole.png";

const Header = () => {
  const headerStyle = {
    width: "100%",
    background: "#fff", // White background
    color: "black",
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "8px solid black", // Thick black border
  };

  const logoStyle = {
    height: "100px",
    marginLeft: "15px",
  };

  const bannerStyle = {
    flexGrow: 1,
    textAlign: "center",
  };

  const textStyle = {
    fontFamily: "serif",
    fontSize: "32px",
    fontWeight: "bold",
  };

  const subTextStyle = {
    fontSize: "16px",
    fontWeight: "bold",
  };

  const stoleStyle = {
    height: "120px",
    marginRight: "15px",
  };

  return (
    <header style={headerStyle}>
      <img src={logo} alt="Chapel Logo" style={logoStyle} />
      <div style={bannerStyle}>
        <h1 style={textStyle}>Chapel of St. Stephen</h1>
        <h2 style={subTextStyle}>
          For Deacons and other Servant Leaders who serve the least, the last,
          and the lost
        </h2>
      </div>
      <img src={stole} alt="Stole" style={stoleStyle} />
    </header>
  );
};

export { Header };
