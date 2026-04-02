import basin from "/images/original/basin.png";
import buttonProps from "../data/buttonProps.json";

const NavButton = ({ link, label, description, isActive }) => (
  <a
    href={isActive ? undefined : link}
    title={description ?? label ?? link}
    className={isActive ? "active" : ""}>
    {label ?? link}
  </a>
);

const NavBar = () => (
  <nav>
    {buttonProps.map(({ link, label, description }, index) => (
      <NavButton
        key={index}
        link={link}
        label={label}
        description={description}
        isActive={link === window.location.pathname}
      />
    ))}
  </nav>
);

const Header = () => (
  <>
    <header
      style={{ display: "flex", flexDirection: "column", height: "200px" }}>
      <h1>Pitcher, Basin & Towel</h1>
      <h3>
        For Deacons and other Servant Leaders who serve the least, the last and
        the lost.
      </h3>
      <img src={basin} alt="logo" className="logo" />
    </header>
    <NavBar />
  </>
);

export { Header };
