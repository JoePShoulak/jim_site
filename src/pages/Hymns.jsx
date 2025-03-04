import { useState } from "react";
import songs from "../data/songs.json";
import Modal from "../components/Modal";
import jim_guitar from "/images/original/jim_guitar.jpg";

const LeftAside = () => <aside></aside>;

const RightAside = () => <aside></aside>;

const Hymns = () => {
  const [song, setSong] = useState(null);

  const Song = ({ title, featured }) => (
    <p className={"song" + (featured ? " featured" : "")}>
      <a onClick={() => setSong(song)}>{title}</a>
    </p>
  );

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
            <Song key={index} {...song} />
          ))}
        </div>
        <div className="column">
          <img src={jim_guitar} alt="Jim playing guitar" />
          <p class="credit">Credit: Maya Bolduan</p>
        </div>
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
