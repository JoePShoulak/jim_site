/* eslint-disable react/prop-types */ // Why?

import { RED, GOLD, DARK_RED } from "../colors";

const NavButton = ({ title, description, link }) => {
  const buttonStyle = {
    padding: "15px 30px",
    margin: "0 15px 5px 15px",
    fontSize: "18px",
    borderRadius: "15px",
    backgroundColor: RED,
    color: GOLD,
    border: "2px solid black",
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  };

  const upSize = e => (e.target.style.transform = "scale(1.05)");
  const darkenButton = e => (e.target.style.backgroundColor = DARK_RED);
  const resetColor = e => (e.target.style.backgroundColor = RED);
  const resetSize = e => (e.target.style.transform = "scale(1)");
  const reset = e => {
    resetColor(e), resetSize(e);
  };

  return (
    <div>
      <button
        style={buttonStyle}
        onMouseOver={upSize}
        onMouseDown={darkenButton}
        onMouseUp={resetColor}
        onMouseOut={reset}
        onClick={() => (window.location.href = link ?? "#")}>
        {title ?? "Title"}
      </button>
      <h4>{description ?? "Description goes here"}</h4>
    </div>
  );
};

export { NavButton };
