import { NavButton } from "./NavButton";

const Footer = () => {
  const footerStyle = {
    width: "100%",
    textAlign: "center",
  };

  const navFooterStyle = {
    ...footerStyle,
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start", // Forces all items to align at the top
    justifyContent: "space-evenly",
    marginBottom: "10px",
    gap: "10px",
  };

  const minorFooterStyle = {
    ...footerStyle,
    background: "#222",
    color: "white",
    padding: "5px",
    fontSize: "0.8em",
  };

  return (
    <>
      <footer style={navFooterStyle}>
        <NavButton
          title={"Chapel"}
          description={
            "31-Day Service-Themed Prayer Cycle, Contemplative Music, and Prayer Requests"
          }
        />
        <NavButton
          title={"Jim's Writings"}
          description={"Sermon Excerpts, Reflections, and Prayers"}
        />
        <NavButton
          title={"Jim's Hymms"}
          description={"MP3s & Lyrics of Original Songs"}
        />
        <NavButton
          title={"The Diaconate"}
          description={"Storied and Commenrary on the Life of a Deacon"}
        />
        <NavButton title={"Gift Shop"} description={"Link To Etsy"} />
        <NavButton
          title={"Info & Contact"}
          description={
            "Story behind this site, as well as Info About Jim, and his Contact Info"
          }
        />
      </footer>
      <footer style={minorFooterStyle}>Made by Joe P. Shoulak - 2025</footer>
    </>
  );
};

export { Footer };
