import "./stylesheets/App.css";
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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chapel" element={<Chapel />} />
      <Route path="/writings" element={<Writings />} />
      <Route path="/hymns" element={<Hymns />} />
      <Route path="/diaconate" element={<Diaconate />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/not_found" element={<NotFound />} />
      <Route path="*" element={<UnknownPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
