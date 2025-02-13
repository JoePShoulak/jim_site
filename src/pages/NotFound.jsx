import useTitle from "../hooks/useTitle";
import img404 from "/images/404.png";

const NotFound = () => {
  useTitle("Not Found");

  return (
    <main>
      <aside></aside>
      <main>
        <div>
          <img src={img404} />
        </div>
      </main>
      <aside></aside>
    </main>
  );
};

export default NotFound;
