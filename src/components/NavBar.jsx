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

export { NavBar };
