// TODO: Change more <img> tags to <Image> tags
const Image = props => {
  const { credit, ...imageProps } = props;

  return (
    <>
      <img {...imageProps} style={{ paddingTop: "30px" }}></img>
      {credit && <p className="credit">Credit: {credit}</p>}
    </>
  );
};

export default Image;
