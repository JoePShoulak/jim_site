import useTitle from "../hooks/useTitle";
import { GREEN } from "../assets/colors";

const Hymns = () => {
  useTitle("Hymns");

  const Song = (title, duration, note = "") => (
    <p style={{ marginBottom: "40px" }}></p>
  );

  return (
    <div
      style={{
        backgroundImage: "url(/images/guitar.png)",
        backgroundPosition: "center",
        backgroundSize: "80%", // Scaled down guitar image
        backgroundRepeat: "no-repeat",
        height: "800px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
      {/* Text Columns */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          maxWidth: "900px",
          color: GREEN, // Blue-ish text color
          fontSize: "20px",
          fontFamily: "serif",
          fontWeight: "bold",
        }}>
        {/* Left Column */}
        <div style={{ textAlign: "left", width: "45%" }}>
          {Song("Welcome the Traveler", "3:06")}
          {Song("Come to Me", "3:27")}
          {Song("A New Dawn is Alive!", "3:54")}
          {Song("Mrs. Schrader’s Garden", "3:59")}
          {Song("In Your Name", "3:11")}
          {Song("Faithful Servant", "4:11")}
          {Song("Say the Word!", "2:55")}
          {Song("Jerusalem", "3:35")}
          {Song("Sister Mary Boniface", "4:22")}
        </div>

        {/* Right Column */}
        <div style={{ textAlign: "right", width: "45%" }}>
          {Song("Hardships & Trials", "3:22")}
          {Song("Psalm 116", "3:07")}
          {Song("God Gave Me Everything", "4:15")}
          {Song("Holy Is His Name", "3:01", "The Magnificat")}
          {Song("For You Are My People", "3:43")}
          {Song("A Believing Thomas", "3:09")}
          {Song("Silent Prayer", "4:21", "Lyrics by My Mom")}
          {Song("Paradise Bay", "4:20")}
        </div>
      </div>
    </div>
  );
};

export default Hymns;
