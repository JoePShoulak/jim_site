/* eslint-disable react/prop-types */
import useTitle from "../hooks/useTitle";
import { GREEN } from "../assets/colors";
import songs from "../data/songs.json";

const Song = ({ title, duration, note = "" }) => (
  <p style={{ marginBottom: "40px" }}>
    {title} {note && `[${note}]`} ({duration})
  </p>
);

const Hymns = () => {
  useTitle("Hymns");

  return (
    <div
      style={{
        backgroundImage: "url(/images/guitar.png)",
        backgroundPosition: "center",
        backgroundSize: "80%", // Scaled down guitar image
        backgroundRepeat: "no-repeat",
        height: "800px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
      {/* Text Columns */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          maxWidth: "900px",
          color: GREEN, // Blue-ish text color
          fontSize: "20px",
          fontFamily: "serif",
          fontWeight: "bold",
        }}>
        {/* Left Column */}
        <div style={{ textAlign: "left", width: "45%" }}>
          {songs.leftColumn.map((song, index) => (
            <Song key={index} {...song} />
          ))}
        </div>

        {/* Right Column */}
        <div style={{ textAlign: "right", width: "45%" }}>
          {songs.rightColumn.map((song, index) => (
            <Song key={index} {...song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hymns;
