import { NavButton } from "./NavButton";
import buttonProps from "../data/navButtons.json"; // Import JSON

const styles = {
  navFooter: {
    width: "100%",
    textAlign: "center",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start", // Forces all items to align at the top
    justifyContent: "space-evenly",
    marginBottom: "10px",
    gap: "10px",
  },
  minorFooterStyle: {
    width: "100%",
    textAlign: "center",
    background: "#222",
    color: "white",
    padding: "5px",
    fontSize: "0.8em",
  },
};

const Footer = () => (
  <>
    <footer style={styles.navFooter}>
      <NavButton {...buttonProps.chapel} />
      <NavButton {...buttonProps.writings} />
      <NavButton {...buttonProps.hymns} />
      <NavButton {...buttonProps.diaconate} />
      <NavButton {...buttonProps.shop} />
      <NavButton {...buttonProps.contact} />
    </footer>
    <footer style={styles.minorFooterStyle}>
      Made by Joe P. Shoulak - 2025
    </footer>
  </>
);

export { Footer };
