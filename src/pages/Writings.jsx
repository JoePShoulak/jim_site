import { useState } from "react";

import Modal from "../components/Modal";
const book = "/images/original/book.png";

import Aside from "../components/Aside";

const postcardLogo = "/images/postcards/A.01 Postmark logo.png";
const postcardPath = "/images/postcards/2026";

const writingEntries = {
  "Morning Offering": "/images/writings/morning-offering.png",
  "Today I am a Deacon": "/images/writings/today-i-am-a-deacon.png",
  "God Waits": "/images/writings/god-waits.png",
  "On Passing Judgement": "/images/writings/on-passing-judgement.png",
  "Thanks to Jesus": "/images/writings/thanks-to-jesus.png",
  Biblets: "/images/writings/biblets.png",
  Friends: "/images/writings/friends.png",
  "What's a Deacon?": "/images/writings/whats-a-deacon.png",
  "Hold on to Each Other!": "/images/writings/hold-on-to-each-other.png",
  "For Discernment in a Group":
    "/images/writings/for-discernment-in-a-group.png",
  "Called to Be Sent": "/images/writings/called-to-be-sent.png",
  "Sleep With the Angels": "/images/writings/sleep-with-the-angels.png",
};

const postcardEntries = [
  {
    title: "Throwing Stones",
    image: `${postcardPath}/Throwing Stones.png`,
    orientation: "horizontal",
  },
  {
    title: "Who Are You, Lord?",
    image: `${postcardPath}/Who Are You Lord.png`,
    orientation: "horizontal",
  },
  {
    title: "Good Samaritans",
    image: `${postcardPath}/Good Samaritans.png`,
    orientation: "horizontal",
  },
  {
    title: "People Are Good",
    image: `${postcardPath}/People Are Good.png`,
    orientation: "horizontal",
  },
  {
    title: "Listening",
    image: `${postcardPath}/Listening.png`,
    orientation: "horizontal",
  },
  {
    title: "Succeed",
    image: `${postcardPath}/Succeed.png`,
    orientation: "horizontal",
  },
  {
    title: "Serve Others",
    image: `${postcardPath}/Serve Others.png`,
    orientation: "horizontal",
  },
  {
    title: "Finish Each Day",
    image: `${postcardPath}/Finish Each Day.png`,
    orientation: "horizontal",
  },
  {
    title: "Whom Should I Serve?",
    image: `${postcardPath}/Whom Should I Serve.png`,
    orientation: "horizontal",
  },
  {
    title: "Samuel Pugh Prayer",
    image: `${postcardPath}/Samuel Pugh prayer.png`,
    orientation: "horizontal",
  },
  {
    title: "Servant Leaders",
    image: `${postcardPath}/Servant Leaders.png`,
    orientation: "horizontal",
  },
  {
    title: "Error 404",
    image: `${postcardPath}/Error 404.png`,
    orientation: "horizontal",
  },
  {
    title: "Gethsemane",
    image: `${postcardPath}/Gethsemane.png`,
    orientation: "horizontal",
  },
  {
    title: "Grief and Loss",
    image: `${postcardPath}/Grief and Loss.01.png`,
    orientation: "horizontal",
  },
  {
    title: "Make the Pain Go Away",
    image: `${postcardPath}/Make the Pain Go Away.png`,
    orientation: "horizontal",
  },
  {
    title: "A Plant in the Wall",
    image: `${postcardPath}/A Plant in the Wall.png`,
    orientation: "horizontal",
  },
  {
    title: "Breast Cancer: Not Unprepared",
    image: `${postcardPath}/Breast Cancer - Not Unprepared.png`,
    orientation: "vertical",
  },
  {
    title: "Breast Cancer: Victory March",
    image: `${postcardPath}/Breast Cancer - Victory March.png`,
    orientation: "vertical",
  },
  {
    title: "Grief: Loved & Lost",
    image: `${postcardPath}/Grief - Loved & Lost.01.png`,
    orientation: "vertical",
  },
  {
    title: "Help Others in Need",
    image: `${postcardPath}/Help Others in Need.png`,
    orientation: "vertical",
  },
  {
    title: "Today I Am A Deacon",
    image: `${postcardPath}/Today I Am A Deacon.png`,
    orientation: "vertical",
  },
  {
    title: "St. Augustine",
    image: `${postcardPath}/St Augustine.png`,
    orientation: "vertical",
  },
  {
    title: "Morning Offering",
    image: `${postcardPath}/Morning Offering.png`,
    orientation: "vertical",
  },
  {
    title: "In Our Darkest Moments",
    image: `${postcardPath}/In Our Darkest Moments.png`,
    orientation: "vertical",
  },
];

const postcardByTitle = Object.fromEntries(
  postcardEntries.map(postcard => [postcard.title, postcard]),
);

const leftPostcards = [
  "Breast Cancer: Not Unprepared",
  "Breast Cancer: Victory March",
  "In Our Darkest Moments",
  "Help Others in Need",
  "Throwing Stones",
  "Who Are You, Lord?",
  "Good Samaritans",
  "People Are Good",
  "Listening",
  "Succeed",
  "Serve Others",
  "Finish Each Day",
].map(title => postcardByTitle[title]);

const rightPostcards = [
  "Today I Am A Deacon",
  "St. Augustine",
  "Morning Offering",
  "Grief: Loved & Lost",
  "Grief and Loss",
  "Whom Should I Serve?",
  "Samuel Pugh Prayer",
  "Servant Leaders",
  "Error 404",
  "Gethsemane",
  "Make the Pain Go Away",
  "A Plant in the Wall",
].map(title => postcardByTitle[title]);

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

const ImageModal = ({ image, alt, downloadName, onClose, className = "" }) => (
  <Modal
    onClose={onClose}
    className={`image-modal ${className}`.trim()}
    showCloseButton={false}>
    <div className="image-modal-scroll">
      <img className="modal-image" src={image} alt={alt} />
    </div>
    <div className="image-modal-actions">
      <a className="image-download" href={image} download={downloadName}>
        Download image
      </a>
      <button onClick={onClose}>Close</button>
    </div>
  </Modal>
);

const PostcardSidebar = ({ postcards = postcardEntries, folkMusic = false }) => {
  const [activePostcard, setActivePostcard] = useState(null);

  return (
    <Aside folkMusic={folkMusic} className="postcard-aside">
      <div className="postcard-sidebar">
        <img
          className="postcard-logo"
          src={postcardLogo}
          alt="Postcards from Jim Shoulak"
        />
        <h3>Click below for free downloads</h3>

        <div className="postcard-grid">
          {postcards.map(postcard => (
            <button
              className={`postcard-tile postcard-tile-${postcard.orientation}`}
              key={postcard.title}
              onClick={() => setActivePostcard(postcard)}>
              <img src={postcard.image} alt="" loading="lazy" />
              <span>{postcard.title}</span>
            </button>
          ))}
        </div>
      </div>

      {activePostcard?.image && (
        <ImageModal
          image={activePostcard.image}
          alt={activePostcard.title}
          downloadName={`${activePostcard.title}.png`}
          className={`postcard-modal postcard-modal-${activePostcard.orientation}`}
          onClose={() => setActivePostcard(null)}
        />
      )}

      {activePostcard && !activePostcard.image && (
        <Modal
          onClose={() => setActivePostcard(null)}
          className="missing-image-modal"
          showCloseButton={false}>
          <p>This postcard image is not available yet.</p>
          <div className="image-modal-actions">
            <button onClick={() => setActivePostcard(null)}>Close</button>
          </div>
        </Modal>
      )}
    </Aside>
  );
};

const CenterSection = () => {
  const [activeEntry, setActiveEntry] = useState(null);

  const openEntry = title => {
    setActiveEntry({
      title,
      image: writingEntries[title],
    });
  };

  const closeEntry = () => {
    setActiveEntry(null);
  };

  return (
    <section className="writings-section">
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

            <PageEntry title="Biblets" onClick={() => openEntry("Biblets")} />
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

      {activeEntry?.image && (
        <ImageModal
          image={activeEntry.image}
          alt={activeEntry.title}
          downloadName={`${activeEntry.title}.png`}
          className="writing-entry-modal"
          onClose={closeEntry}
        />
      )}

      {activeEntry && !activeEntry.image && (
        <Modal
          onClose={closeEntry}
          className="image-modal missing-image-modal"
          showCloseButton={false}>
          <p>This writing image is not available yet.</p>
          <div className="image-modal-actions">
            <button onClick={closeEntry}>Close</button>
          </div>
        </Modal>
      )}
    </section>
  );
};

const Writings = () => (
  <>
    <PostcardSidebar postcards={leftPostcards} />
    <CenterSection />
    <PostcardSidebar postcards={rightPostcards} folkMusic />
  </>
);

export default Writings;
