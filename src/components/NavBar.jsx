/* eslint-disable react/prop-types */

import buttonProps from "../data/buttonProps.json";

const NavButton = ({ link, title }) => <a href={link}>{title ?? link}</a>;

console.log(buttonProps);

const NavBar = () => (
  <nav>
    {/* <NavButton link="/" title="Home" />
    <NavButton link="/about" title="About" />
    <NavButton link="/services" title="Services" />
    <NavButton link="/contact" title="Contact" /> */}
    {buttonProps.map((bp, i) => (
      <NavButton key={i} link={bp.link} title={bp.title} />
    ))}
  </nav>
);

export { NavBar };
