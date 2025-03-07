// TODO: Change more <img> tags to <Image> tags
const Image = props => {
  const { [props.credit]: _, ...imageProps } = props;
  return (
    <>
      <img {...imageProps} style={{ paddingTop: "30px" }}></img>
      {props.credit && <p className="credit">Credit: {props.credit}</p>}
    </>
  );
};

export default Image;
