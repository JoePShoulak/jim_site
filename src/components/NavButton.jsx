/* eslint-disable react/prop-types */ // Why?

import { RED, GOLD } from "../colors";

const darkenColor = (col, amt) => {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  let r = (num >> 16) - amt;
  let g = ((num >> 8) & 0x00ff) - amt;
  let b = (num & 0x0000ff) - amt;
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);
  return (
    (usePound ? "#" : "") +
    ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
  );
};

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
  const darkenButton = e =>
    (e.target.style.backgroundColor = darkenColor(RED, 40));
  const resetColor = e => (e.target.style.backgroundColor = RED);
  const resetSize = e => (e.target.style.transform = "scale(1)");

  return (
    <div>
      <button
        style={buttonStyle}
        onMouseOver={upSize}
        onMouseDown={darkenButton}
        onMouseUp={resetColor}
        onMouseOut={e => {
          resetColor(e), resetSize(e);
        }}
        onClick={() => (window.location.href = link ?? "#")}>
        {title ?? "Title"}
      </button>
      <h4>{description ?? "Description goes here"}</h4>
    </div>
  );
};

export { NavButton };
