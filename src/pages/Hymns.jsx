import { useState } from "react";
import songs from "../data/songs.json";
import Modal from "../components/Modal";

const Song = ({ title, duration, onClick }) => (
  <p className="song">
    <a onClick={onClick} style={{ cursor: "pointer" }}>
      {title} ({duration})
    </a>
  </p>
);

const SongModal = ({ song, onClose }) => (
  <Modal title={song.title} onClose={onClose}>
    <audio controls>
      <source src={song.audio} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    {song.description && <p>{song.description}</p>}
  </Modal>
);

const LeftAside = () => <aside></aside>;

const CenterSection = ({ onSongClick }) => (
  <section>
    <h2>Hymns</h2>
    {songs.map((song, index) => (
      <Song key={index} {...song} onClick={() => onSongClick(song)} />
    ))}
  </section>
);

const RightAside = () => <aside></aside>;

const Hymns = () => {
  const [song, setSong] = useState(null);

  return (
    <>
      <LeftAside />
      <CenterSection onSongClick={setSong} />
      <RightAside />
      {song && <SongModal song={song} onClose={() => setSong(null)} />}
    </>
  );
};

export default Hymns;
