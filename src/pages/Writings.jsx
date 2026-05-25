import { useState } from "react";

import Modal from "../components/Modal";
import lighthouse from "/images/original/lighthouse.jpeg";
import elephant_oak from "/images/original/elephant_oak.jpg";
const superior_sunset = "/images/original/superior_sunset.JPG";
const book = "/images/original/book.png";

import Aside from "../components/Aside";

import writings from "../data/writings.json";

const PageEntry = ({ title, subtitle, subtitles = [], onClick }) => {
  const allSubtitles = subtitle ? [subtitle, ...subtitles] : subtitles;

  return (
    <li className="page-entry" onClick={onClick}>
      <span className="entry-title">{title}</span>

      {allSubtitles.map(text => (
        <span className="entry-subtitle" key={text}>
          {text}
        </span>
      ))}
    </li>
  );
};

const CenterSection = () => {
  const [activeEntry, setActiveEntry] = useState(null);

  const openEntry = title => {
    setActiveEntry({
      title,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae nibh sed lorem gravida fermentum. Donec non magna at ipsum luctus dictum. Praesent vel sapien sed neque volutpat luctus.",
    });
  };

  const closeEntry = () => {
    setActiveEntry(null);
  };

  return (
    <section className="center-section">
      <h2>Writings</h2>

      <div className="book-wrapper">
        <img
          className="writing-image"
          src={book}
          alt="A journal with writing in it"
        />

        <div className="book-pages">
          <ul className="book-list left-page">
            <PageEntry
              title="Morning Offering"
              onClick={() => openEntry("Morning Offering")}
            />

            <PageEntry
              title="Today I am a Deacon"
              subtitle="Morning Offering"
              onClick={() => openEntry("Today I am a Deacon")}
            />

            <PageEntry
              title="God Waits"
              onClick={() => openEntry("God Waits")}
            />

            <PageEntry
              title="On Passing Judgement"
              onClick={() => openEntry("On Passing Judgement")}
            />

            <PageEntry
              title="Thanks to Jesus"
              onClick={() => openEntry("Thanks to Jesus")}
            />

            <PageEntry
              title="Comfort, Give Comfort"
              onClick={() => openEntry("Comfort, Give Comfort")}
            />
          </ul>

          <ul className="book-list right-page">
            <PageEntry title="Friends" onClick={() => openEntry("Friends")} />

            <PageEntry
              title="What's a Deacon?"
              onClick={() => openEntry("What's a Deacon?")}
            />

            <PageEntry
              title="Hold on to Each Other!"
              subtitle="Song Lyrics"
              onClick={() => openEntry("Hold on to Each Other!")}
            />

            <PageEntry
              title="For Discernment in a Group"
              onClick={() => openEntry("For Discernment in a Group")}
            />

            <PageEntry
              title="Called to Be Sent"
              onClick={() => openEntry("Called to Be Sent")}
            />

            <PageEntry
              title="Sleep With the Angels"
              subtitles={["A Deacon's Compline", "Song Lyrics"]}
              onClick={() => openEntry("Sleep With the Angels")}
            />
          </ul>
        </div>
      </div>

      {activeEntry && (
        <Modal title={activeEntry.title} onClose={closeEntry}>
          <p>{activeEntry.content}</p>
        </Modal>
      )}
    </section>
  );
};

const RightAside = () => <Aside></Aside>;

const Writings = () => (
  <>
    <Aside />
    <CenterSection />
    <RightAside />
  </>
);

export default Writings;
