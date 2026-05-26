import { useState } from "react";

import Modal from "../components/Modal";
const book = "/images/original/book.png";

import Aside from "../components/Aside";

const postcardLogo = "/images/postcards/A.01 Postmark logo.png";

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
    image: "/images/postcards/JPC01 Throwing Stones.png",
  },
  {
    title: "Who Are You, Lord?",
    image: "/images/postcards/JPC02 Who Are You.png",
  },
  {
    title: "Humble Service",
    image: "/images/postcards/JPC03 Humble Service.png",
  },
  {
    title: "Service of Heart & Mind",
    image: "/images/postcards/JPC04 Heart and Mind.png",
  },
  {
    title: "Good Samaritans",
    image: "/images/postcards/JPC05 Good Samaritans.png",
  },
  {
    title: "People Are Good",
    image: "/images/postcards/JPC06 People are good.png",
  },
  {
    title: "On Listening",
    image: "/images/postcards/JPC07 On Listening.png",
  },
  {
    title: "Healing the World",
    image: "/images/postcards/JPC08 Healing the World.png",
  },
  {
    title: "In Our Darkest Moments",
    image: "/images/postcards/JPC09 In Our Darkest Moments.png",
  },
  {
    title: "If You Don't Succeed...",
    image: "/images/postcards/JPC10 If You Don't Succeed.png",
  },
  {
    title: "Ladybug on My Phone",
    image: "/images/postcards/JPC11 Ladybug.png",
  },
  {
    title: "Serve Others",
    image: "/images/postcards/JPC12 Serve Others.png",
  },
  {
    title: "Breast Cancer Music",
    image: "/images/postcards/JPC13 Breast Cancer Music.png",
  },
  {
    title: "Finish Each Day",
    image: "/images/postcards/JPC14 Finish Each Day.png",
  },
  {
    title: "Breast Cancer: You Are Prepared",
    image: "/images/postcards/JPC15 Breast Cancer You Are Prepared.png",
  },
  // TODO: Add the missing JPC16 postcard image for this layout entry.
  {
    title: "Breast Cancer Victory",
    image: null,
  },
  {
    title: "A Note for Grief",
    image: "/images/postcards/JPC17 A Note for Grief.png",
  },
  {
    title: "Grief Comfort",
    image: "/images/postcards/JPC18 Grief Comfort.png",
  },
  {
    title: "Whom Should I Serve?",
    image: "/images/postcards/JPC19 Samuel Pugh Prayer.png",
  },
  {
    title: "Error 404",
    image: "/images/postcards/JPC20 Error 404.png",
  },
  {
    title: "Gethsemane",
    image: "/images/postcards/JPC21 Gethsemane.png",
  },
  {
    title: "Morning Offering",
    image: "/images/postcards/JPC22 Morning Offering.png",
  },
  {
    title: "St. Augustine Quotes",
    image: "/images/postcards/JPC23 St Augustine Quotes.png",
  },
];

const portraitPostcardImages = [
  "/images/postcards/JPC04 Heart and Mind.png",
  "/images/postcards/JPC09 In Our Darkest Moments.png",
  "/images/postcards/JPC13 Breast Cancer Music.png",
  "/images/postcards/JPC15 Breast Cancer You Are Prepared.png",
  "/images/postcards/JPC18 Grief Comfort.png",
];

const postcardByTitle = Object.fromEntries(
  postcardEntries.map(postcard => [postcard.title, postcard]),
);

const leftPostcards = [
  "Throwing Stones",
  "Who Are You, Lord?",
  "Humble Service",
  "Good Samaritans",
  "People Are Good",
  "On Listening",
  "Healing the World",
  "If You Don't Succeed...",
  "Ladybug on My Phone",
  "Service of Heart & Mind",
  "In Our Darkest Moments",
  "Breast Cancer Music",
].map(title => postcardByTitle[title]);

const rightPostcards = [
  "Serve Others",
  "Finish Each Day",
  "A Note for Grief",
  "Whom Should I Serve?",
  "Gethsemane",
  "Error 404",
  "Morning Offering",
  "St. Augustine Quotes",
  "Breast Cancer: You Are Prepared",
  "Grief Comfort",
].map(title => postcardByTitle[title]);

const getLandscapePostcards = postcards =>
  postcards.filter(
    postcard =>
      postcard?.image && !portraitPostcardImages.includes(postcard.image),
  );

const getPortraitPostcards = postcards =>
  postcards.filter(
    postcard =>
      postcard?.image && portraitPostcardImages.includes(postcard.image),
  );

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

const PostcardSidebar = ({ postcards = postcardEntries }) => {
  const [activePostcard, setActivePostcard] = useState(null);
  const landscapePostcards = getLandscapePostcards(postcards);
  const portraitPostcards = getPortraitPostcards(postcards);

  return (
    <Aside>
      <div className="postcard-sidebar">
        <img
          className="postcard-logo"
          src={postcardLogo}
          alt="Postcards from Jim Shoulak"
        />
        <h3>Click below for free downloads</h3>

        <div className="postcard-grid postcard-grid-main">
          {landscapePostcards.map(postcard => (
            <button
              className="postcard-tile"
              key={postcard.title}
              onClick={() => setActivePostcard(postcard)}>
              <span>{postcard.title}</span>
            </button>
          ))}
        </div>

        <div className="postcard-grid postcard-grid-vertical">
          {portraitPostcards.map(postcard => (
            <button
              className="postcard-tile postcard-tile-vertical"
              key={postcard.title}
              onClick={() => setActivePostcard(postcard)}>
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
          className="postcard-modal"
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
    <section className="center-section">
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
    <PostcardSidebar postcards={rightPostcards} />
  </>
);

export default Writings;
