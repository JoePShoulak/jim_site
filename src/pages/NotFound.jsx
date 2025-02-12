import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("Not Found");

  return (
    <main>
      <aside></aside>
      <main>
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "blue", fontSize: "18px" }}>
            Return to Home
          </Link>
        </div>
      </main>
      <aside></aside>
    </main>
  );
};

export default NotFound;
