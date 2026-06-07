import { useState } from "react";
import songs from "../data/songs.json";
import Modal from "../components/Modal";
import jimGuitar from "/images/original/jim_guitar.jpg";

import Aside from "../components/Aside";

const Song = ({ title, onClick, featured }) => (
  <p className={"song" + `${featured ? " featured" : ""}`}>
    <a onClick={onClick}>{title}</a>
  </p>
);

const songByTitle = Object.fromEntries(songs.map(song => [song.title, song]));

const sleepWithTheAngels = songByTitle["Sleep With the Angels (A Deacon's Compline)"];

const leftSongs = [
  sleepWithTheAngels,
  songByTitle["A Believing Thomas"],
  songByTitle["A New Dawn is Alive!"],
  songByTitle["Come to Me"],
  songByTitle["Don't Take This Lying Down"],
  songByTitle["Faithful Servant"],
];

const centerLeftSongs = [
  songByTitle["For You Are My People"],
  songByTitle["God Gave Me Everything"],
  songByTitle["Hardships & Trials"],
  songByTitle["Hold On to Each Other"],
];

const holyVersionOne = songByTitle["Holy Is His Name (The Magnificat) version 1"];
const holyVersionTwo = songByTitle["Holy Is His Name (The Magnificat) version 2"];

const centerRightSongs = [
  songByTitle["I Miss You Every Lent"],
  songByTitle["In Your Name"],
  songByTitle["Jerusalem"],
  songByTitle["Keep Out of Reach of Children"],
  songByTitle["Lay Your Weapons Down, Boys"],
  songByTitle["Mrs. Schrader's Garden"],
  songByTitle["Paradise Bay"],
];

const rightSongs = [
  songByTitle["Psalm 116"],
  songByTitle["Roses of Dundee"],
  songByTitle["Say the Word!"],
  songByTitle["Silent Prayer - Live"],
  songByTitle["Sister Mary Boniface"],
  songByTitle["Welcome the Traveler"],
];

const SongList = ({ entries, onSelect, className = "" }) => (
  <div className={className}>
    {entries.filter(Boolean).map(song => (
      <Song
        key={song.title}
        {...song}
        featured={false}
        onClick={() => onSelect(song)}
      />
    ))}
  </div>
);

const LeftAside = ({ onSelect }) => (
  <Aside>
    <div className="hymn-sidebar-list">
      {sleepWithTheAngels && (
        <p className="song featured hymn-featured-song">
          <a onClick={() => onSelect(sleepWithTheAngels)}>
            Sleep With the Angels
          </a>
          <span>(A Deacon's Compline)</span>
        </p>
      )}
      <SongList entries={leftSongs.slice(1)} onSelect={onSelect} />
    </div>
    <p className="song-note">
      <strong>PLEASE NOTE:</strong>
      <br />
      The songs included here are free-use for congregations, retreats, youth
      groups, conferences and other local church gatherings. Please write to me
      if you would like to record any of this material.
      <br />
      Thank you.
    </p>
  </Aside>
);

const RightAside = ({ onSelect }) => (
  <Aside folkMusic>
    <SongList
      entries={rightSongs}
      onSelect={onSelect}
      className="hymn-sidebar-list"
    />
  </Aside>
);

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
    <section className="hymns-section">
      <div className="song-columns">
        <div>
          <SongList entries={centerLeftSongs} onSelect={setSong} />
          <p className="song holy-song-title">Holy Is His Name</p>
          <p className="song holy-song-subtitle">(The Magnificat)</p>
          <p className="song holy-song-versions">
            <a onClick={() => setSong(holyVersionOne)}>version 1</a>
            <span> • </span>
            <a onClick={() => setSong(holyVersionTwo)}>version 2</a>
          </p>
        </div>
        <SongList entries={centerRightSongs} onSelect={setSong} />
      </div>
      <img className="hymn-photo" src={jimGuitar} alt="Jim playing guitar" />
      <p className="credit hymn-photo-credit">Photo Credit: Maya Bolduan</p>
    </section>
  );

  return (
    <>
      <LeftAside onSelect={setSong} />
      <CenterSection />
      <RightAside onSelect={setSong} />
      {song && <SongModal />}
    </>
  );
};

export default Hymns;
