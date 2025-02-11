const Header = () => {
  const style = {
    width: "100%",
    background: "#333",
    color: "white",
    padding: "20px",
    textAlign: "center", // Fixed camelCase issue
  };

  return (
    <header style={style}>
      <h1>Chapel of St. Stephen</h1>
      <h2>
        For Deacons and other Servant Leaders who serve the least, the last, and
        the lost
      </h2>
    </header>
  );
};

export { Header };
