/* eslint-disable react/prop-types */ // Why?

import { RED, GOLD } from "../colors";
import { colorChange } from "../scripts/colorChange";

const styles = {
  div: {
    textAlign: "center",
    flex: "1", // Ensures equal width distribution across the footer
    display: "flex",
    flexDirection: "column", // Ensures content stacks downward
    justifyContent: "flex-start", // Makes sure content grows downward
    alignItems: "center",
    maxWidth: "200px", // Prevents excessive stretching
    minWidth: "150px", // Ensures a reasonable minimum width
  },
  button: {
    fontFamily: "RomanAntique, Serif",
    padding: "15px 30px",
    margin: "0 15px 5px 15px",
    fontSize: "22px",
    borderRadius: "15px",
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
  },
  description: {
    fontSize: "0.9em",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    textAlign: "center",
    marginTop: "5px", // Adds spacing between button and text
    width: "100%", // Prevents text from altering the div width
  },
};

const NavButton = ({ title, description, link, color = RED }) => {
  const upSize = e => (e.target.style.transform = "scale(1.05)");
  const darkenButton = e =>
    (e.target.style.backgroundColor = colorChange(color, -0.4));
  const resetColor = e => (e.target.style.backgroundColor = color);
  const resetSize = e => (e.target.style.transform = "scale(1)");
  const reset = e => {
    resetColor(e), resetSize(e);
  };

  return (
    <div style={styles.div}>
      <button
        style={{ ...styles.button, backgroundColor: color }}
        onMouseOver={upSize}
        onMouseDown={darkenButton}
        onMouseUp={resetColor}
        onMouseOut={reset}
        onClick={() => (window.location.href = link ?? "#")}>
        {title ?? "Title"}
      </button>
      <h4 style={styles.description}>
        {description ?? "Description goes here"}
      </h4>
    </div>
  );
};

export { NavButton };
