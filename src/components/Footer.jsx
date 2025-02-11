import { NavButton } from "./NavButton";

const Footer = () => {
  const navFooterStyle = {
    width: "100%",
    color: "white",
    textAlign: "center",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "10px", // Adds spacing between button sets
  };

  const minorFooterStyle = {
    width: "100%",
    background: "#222",
    color: "white",
    textAlign: "center",
    padding: "5px",
    fontSize: "0.8em",
  };

  return (
    <>
      <footer style={navFooterStyle}>
        <NavButton title={"Chapel"} />
        <NavButton title={"Jim's Writings"} />
        <NavButton title={"Jim's Hymms"} />
        <NavButton title={"The Diaconate"} />
        <NavButton title={"Gift Shop"} />
        <NavButton title={"Info & Contact"} />
      </footer>
      <footer style={minorFooterStyle}>Made by Joe P. Shoulak - 2025</footer>
    </>
  );
};

export { Footer };
