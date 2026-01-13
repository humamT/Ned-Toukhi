import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/home/Home.jsx";
import AboutPage from "./pages/about/About.jsx";
import ContactPage from "./pages/contact/Contact.jsx";
import GalleryPage from "./pages/gallery/Gallery.jsx";
import QuotationsPage from "./pages/quotations/Quotations.jsx";
import StorePage from "./pages/store/Store.jsx";

import Footer from "./components/footer/footer.jsx";
import Header from "./components/header/header.jsx";

function App() {
  const [headerVisible, setHeaderVisible] = useState(false);

  return (
    <BrowserRouter>
      <Header visible={headerVisible} />

      <Routes>
        <Route
          path="/"
          element={<HomePage setHeaderVisible={setHeaderVisible} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/quotations" element={<QuotationsPage />} />
        <Route path="/store" element={<StorePage />} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
