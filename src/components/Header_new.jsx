const Header = () => {
  const headerStyle = {
    width: "100%", // Ensures the header takes the full width
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px",
    boxSizing: "border-box", // Prevents padding from increasing the element's width
    textAlign: "center",
    margin: "0px 0px 0px 0px",
  };

  return (
    <header style={headerStyle}>
      <h1>Full-Width Header</h1>
    </header>
  );
};

export { Header };
