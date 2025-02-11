/* eslint-disable react/prop-types */ // Why?

import { RED, GOLD } from "../colors";
import { colorChange } from "../scripts/colorChange";

const NavButton = ({ title, description, link, color = RED }) => {
  const divStyle = {
    textAlign: "center",
    flex: "1", // Ensures equal width distribution across the footer
    display: "flex",
    flexDirection: "column", // Ensures content stacks downward
    justifyContent: "flex-start", // Makes sure content grows downward
    alignItems: "center",
    maxWidth: "200px", // Prevents excessive stretching
    minWidth: "150px", // Ensures a reasonable minimum width
  };

  const buttonStyle = {
    padding: "15px 30px",
    margin: "0 15px 5px 15px",
    fontSize: "18px",
    borderRadius: "15px",
    backgroundColor: color,
    color: GOLD,
    border: "2px solid black",
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.2s ease",
    height: "60px", // Fixed height to make all buttons the same size
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Ensures button width is consistent
    maxWidth: "180px", // Prevents stretching but keeps it uniform
  };

  const descriptionStyle = {
    fontSize: "0.9em",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    textAlign: "center",
    marginTop: "5px", // Adds spacing between button and text
    width: "100%", // Prevents text from altering the div width
  };

  const upSize = e => (e.target.style.transform = "scale(1.05)");
  const darkenButton = e =>
    (e.target.style.backgroundColor = colorChange(color, -0.4));
  const resetColor = e => (e.target.style.backgroundColor = color);
  const resetSize = e => (e.target.style.transform = "scale(1)");
  const reset = e => {
    resetColor(e), resetSize(e);
  };

  return (
    <div style={divStyle}>
      <button
        style={buttonStyle}
        onMouseOver={upSize}
        onMouseDown={darkenButton}
        onMouseUp={resetColor}
        onMouseOut={reset}
        onClick={() => (window.location.href = link ?? "#")}>
        {title ?? "Title"}
      </button>
      <h4 style={descriptionStyle}>{description ?? "Description goes here"}</h4>
    </div>
  );
};

export { NavButton };
