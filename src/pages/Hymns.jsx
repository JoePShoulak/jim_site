/* eslint-disable react/prop-types */
import { useState } from "react";
import useTitle from "../hooks/useTitle";
import songs from "../data/songs.json";
import Modal from "../components/Modal";

const Song = ({ title, duration, note = "", onClick }) => (
  <p className="song" onClick={onClick} style={{ cursor: "pointer" }}>
    {title} {note && `[${note}]`} ({duration})
  </p>
);

const SongColumn = ({ songs, position, onSongClick }) => (
  <div className={`${position}-column`}>
    {songs.map((song, index) => (
      <Song key={index} {...song} onClick={() => onSongClick(song)} />
    ))}
  </div>
);

const Hymns = () => {
  useTitle("Hymns");
  const mid = Math.ceil(songs.length / 2);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const openModal = song => {
    setSelectedSong({ ...song });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <main id="hymns">
      <div className="text-columns">
        <SongColumn
          songs={songs.slice(0, mid)}
          position={"left"}
          onSongClick={openModal}
        />
        <SongColumn
          songs={songs.slice(mid)}
          position={"right"}
          onSongClick={openModal}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedSong?.title}>
        {selectedSong && (
          <div>
            {selectedSong.note && <p>Note: {selectedSong.note}</p>}
            <p>Description: {selectedSong.description || selectedSong.title}</p>
            <audio controls>
              <source src={selectedSong.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Hymns;
