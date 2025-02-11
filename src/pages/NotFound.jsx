import { Link } from "react-router-dom";

const NotFound = () => (
  <main style={{ textAlign: "center", padding: "50px" }}>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link
      to="/"
      style={{ textDecoration: "none", color: "blue", fontSize: "18px" }}>
      Return to Home
    </Link>
  </main>
);

export default NotFound;
