import "./stylesheets/App.scss";

import {
  Home,
  Chapel,
  Writings,
  Hymns,
  Diaconate,
  Contact,
  NotFound,
} from "./pages";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UnknownPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/not_found", { replace: true });
  }, [navigate]);

  return null;
};

const parseTitle = word =>
  (word.charAt(0).toUpperCase() + word.slice(1)).replace("/", "");

// TODO: Fix that the title "flickers" top the true URL before updating correctly
const PageTitleUpdater = () => {
  const location = useLocation().pathname;
  document.title = `PB&T | ${location == "/" ? "Home" : parseTitle(location)}`;
};

const App = () => (
  <>
    <Header />
    <Router>
      <PageTitleUpdater />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chapel" element={<Chapel />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/hymns" element={<Hymns />} />
          <Route path="/diaconate" element={<Diaconate />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<UnknownPage />} />
          <Route path="/not_found" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
    <Footer />
  </>
);

export default App;
