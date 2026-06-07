import basin from "/images/original/basin.png";
import jimMusicLogo from "/images/original/jim-music-logo.png";

const Aside = props => (
  <aside className={props.className}>
    {props.logo && <img src={basin} alt="logo" className="logo" />}
    {props.children || <></>}
    {props.folkMusic && (
      <a
        className="folk-music-callout"
        href="https://jimshoulak.com"
        target="_blank"
        rel="noreferrer"
        title="Jim's Folk Music">
        <img src={jimMusicLogo} alt="Jim's Folk Music - jimshoulak.com" />
      </a>
    )}
  </aside>
);

export default Aside;
