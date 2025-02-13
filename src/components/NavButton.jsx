/* eslint-disable react/prop-types */ // Why?
import { RED } from "../assets/colors";
import { colorChange } from "../utils/colorChange";

const NavButton = ({ title, description, link, backgroundColor = RED }) => {
  const upSize = e => (e.target.style.transform = "scale(1.05)");
  const darkenButton = e =>
    (e.target.style.backgroundColor = colorChange(backgroundColor, -0.4));
  const resetColor = e => (e.target.style.backgroundColor = backgroundColor);
  const resetSize = e => (e.target.style.transform = "scale(1)");
  const navigate = () => (window.location.href = link ?? "#");
  const reset = e => {
    resetColor(e), resetSize(e);
  };

  return (
    <div className="nav-button">
      <button
        className="nav-button"
        style={{ backgroundColor }}
        onMouseOver={upSize}
        onMouseDown={darkenButton}
        onMouseUp={resetColor}
        onMouseOut={reset}
        onClick={navigate}>
        {title ?? "Title"}
      </button>
      <h4 className="nav-button">{description ?? "Description goes here"}</h4>
    </div>
  );
};

export { NavButton };
