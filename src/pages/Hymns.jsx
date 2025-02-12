/* eslint-disable react/prop-types */
import useTitle from "../hooks/useTitle";
import songs from "../data/songs.json";

const Song = ({ title, duration, note = "" }) => (
  <p style={{ marginBottom: "40px" }}>
    {title} {note && `[${note}]`} ({duration})
  </p>
);

const Hymns = () => {
  useTitle("Hymns");

  return (
    <main id="hymns">
      {/* Text Columns */}
      <div className="text-columns">
        {/* Left Column */}
        <div className="left-column">
          {songs.leftColumn.map((song, index) => (
            <Song key={index} {...song} />
          ))}
        </div>

        {/* Right Column */}
        <div className="right-column">
          {songs.rightColumn.map((song, index) => (
            <Song key={index} {...song} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Hymns;
