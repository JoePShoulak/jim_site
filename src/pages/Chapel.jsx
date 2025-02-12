import { useState } from "react";
import { Link } from "react-router-dom";

import myGif from "../images/candle.gif";

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  dailyPrayers: {
    grid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: "200px",
      margin: "auto",
    },
  },
};

const DailyPrayers = () => {
  const [currentDay] = useState(new Date().getDate()); // Get today's day number

  const isToday = day => day === currentDay;

  const dayNumberStyle = day => ({
    textDecoration: "none",
    color: isToday(day) ? "red" : "black", // Highlight current day
    fontWeight: isToday(day) ? "bold" : "normal",
    margin: "5px",
    fontSize: "18px",
  });

  return (
    <div style={styles.container}>
      <h2>Daily Prayers</h2>
      <p>Day #:</p>
      <div style={styles.dailyPrayers.grid}>
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          return (
            <Link key={day} to={`/prayer/${day}`} style={dayNumberStyle(day)}>
              {day}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Chapel = () => (
  <main>
    <aside>
      <DailyPrayers />
    </aside>
    <main>
      <div>
        <h1>Chapel</h1>
        <p>Chapel</p>
      </div>
    </main>
    <aside>
      <div style={{ textAlign: "center" }}>
        <h3>Prayer Requests</h3>
        <img src={myGif} alt="Flickering candle" width="300px" />
      </div>
    </aside>
  </main>
);

export default Chapel;
