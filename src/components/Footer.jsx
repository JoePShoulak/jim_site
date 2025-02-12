import { NavButton } from "./NavButton";
import buttonProps from "../data/navButtons.json"; // Import JSON
import { GREEN, RED } from "../assets/colors";

const Footer = () => (
  <>
    <footer id="navFooter">
      {Object.entries(buttonProps).map(([key, bp]) => {
        return <NavButton key={key} {...bp} color={bp.alt ? GREEN : RED} />;
      })}
    </footer>
    <footer id="minorFooter">
      Made by Joe P. Shoulak - {new Date().getFullYear()}
    </footer>
  </>
);

export { Footer };
