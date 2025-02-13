/* eslint-disable react/prop-types */
import useTitle from "../hooks/useTitle";
import songs from "../data/songs.json";

const Song = ({ title, duration, note = "" }) => (
  <p className="song">
    {title} {note && `[${note}]`} ({duration})
  </p>
);

const SongColumn = ({ songs, position }) => (
  <div className={`${position}-column`}>
    {songs.map((song, index) => (
      <Song key={index} {...song} />
    ))}
  </div>
);

const Hymns = () => {
  useTitle("Hymns");
  const mid = Math.ceil(songs.length / 2);

  return (
    <main id="hymns">
      <div className="text-columns">
        <SongColumn songs={songs.slice(0, mid)} position={"left"} />
        <SongColumn songs={songs.slice(mid)} position={"right"} />
      </div>
    </main>
  );
};

export default Hymns;
