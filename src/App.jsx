import "./App.css";
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

      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
