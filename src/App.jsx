import "./stylesheets/App.scss";
import {
  Home,
  Chapel,
  Writings,
  Hymns,
  Diaconate,
  Shop,
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

const capitalizeWord = word => word.charAt(0).toUpperCase() + word.slice(1);

const PageTitleUpdater = () => {
  let location = useLocation().pathname;
  // TODO: Fix that the title "flickers" top the true URL before updating correctly

  useEffect(() => {
    location =
      location == "/" ? "Home" : capitalizeWord(location.replace("/", ""));

    document.title = `PB&T | ${location}`;
  }, [location]);

  return null;
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
          <Route path="/shop" element={<Shop />} />
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
