import { useState } from "react";
import songs from "../data/songs.json";
import Modal from "../components/Modal";

const Song = ({ title, duration, onClick }) => (
  <p className="song">
    <a onClick={onClick}>
      {title} ({duration})
    </a>
  </p>
);

const LeftAside = () => <aside></aside>;

const RightAside = () => <aside></aside>;

const Hymns = () => {
  const [song, setSong] = useState(null);

  const SongModal = () => (
    <Modal title={song.title} onClose={() => setSong(null)}>
      <audio controls>
        <source src={song.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {song.description && <p>{song.description}</p>}
    </Modal>
  );

  const CenterSection = () => (
    <section>
      <h2>Hymns</h2>
      <div className="two-column-content">
        <div className="column">
          {songs.map((song, index) => (
            <Song key={index} {...song} onClick={() => setSong(song)} />
          ))}
        </div>
        <div className="column"></div>
      </div>
    </section>
  );

  return (
    <>
      <LeftAside />
      <CenterSection />
      <RightAside />
      {song && <SongModal />}
    </>
  );
};

export default Hymns;
