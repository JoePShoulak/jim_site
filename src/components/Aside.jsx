import basin from "/images/original/basin.png";

const Aside = props => (
  <aside>
    {props.logo && <img src={basin} alt="logo" className="logo" />}
    {props.children}
  </aside>
);

export default Aside;
