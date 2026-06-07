import basin from "/images/original/basin.png";
import buttonProps from "../data/buttonProps.json";
import { NavLink } from "react-router-dom";

const NavButton = ({ link, label, description }) => (
  <NavLink
    to={link}
    title={description ?? label ?? link}
    className={({ isActive }) => (isActive ? "active" : "")}>
    {label ?? link}
  </NavLink>
);

const NavBar = () => (
  <nav>
    {buttonProps.map(({ link, label, description }, index) => (
      <NavButton
        key={index}
        link={link}
        label={label}
        description={description}
      />
    ))}
  </nav>
);

const Header = () => (
  <>
    <header>
      <div className="site-title">
        <h1>Pitcher, Basin & Towel</h1>
        <h3>
          For Deacons and other Servant Leaders who serve the least, the last
          and the lost.
        </h3>
      </div>
      <img src={basin} alt="logo" className="logo" />
    </header>
    <NavBar />
  </>
);

export { Header };
