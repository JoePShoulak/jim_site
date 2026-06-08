import "./stylesheets/App.scss";

import {
  Home,
  Chapel,
  Writings,
  Hymns,
  Diaconate,
  Disclaimers,
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
import { trackPageView } from "./analytics";

const UnknownPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/not_found", { replace: true });
  }, [navigate]);

  return null;
};

const parseTitle = word => {
  const title = word.replace("/", "");
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const getPageTitle = pathname =>
  `PB&T | ${pathname == "/" ? "Home" : parseTitle(pathname)}`;

const PageTitleUpdater = () => {
  const pathname = useLocation().pathname;

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return null;
};

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;

    trackPageView({
      path,
      title: getPageTitle(location.pathname),
    });
  }, [location]);

  return null;
};

const App = () => (
  <Router>
    <Header />
    <PageTitleUpdater />
    <AnalyticsTracker />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapel" element={<Chapel />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/hymns" element={<Hymns />} />
        <Route path="/diaconate" element={<Diaconate />} />
        <Route path="/disclaimers" element={<Disclaimers />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<UnknownPage />} />
        <Route path="/not_found" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
