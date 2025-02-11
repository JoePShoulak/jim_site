import { NavButton } from "./NavButton";

const Footer = () => {
  const navFooterStyle = {
    width: "100%",
    color: "white",
    textAlign: "center",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start", // Forces all items to align at the top
    justifyContent: "space-evenly",
    marginBottom: "10px",
    gap: "10px",
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
        <NavButton
          title={"Chapel"}
          description={
            "31-Day Service-Themed Prayer Cycle, Contemplative Music, and Prayer Requests"
          }
        />
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
