import "./App.scss";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/home/Home.jsx";
import AboutPage from "./pages/about/About.jsx";
import ContactPage from "./pages/contact/Contact.jsx";
import GalleryPage from "./pages/gallery/Gallery.jsx";
import QuotationsPage from "./pages/quotations/Quotations.jsx";
import StorePage from "./pages/store/Store.jsx";

import Footer from "./components/footer/footer.jsx";
import Header from "./components/header/header.jsx";

function AppContent({ headerVisible, setHeaderVisible }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  // Show header on all non-home pages by default
  useEffect(() => {
    if (!isHomePage) {
      setHeaderVisible(true);
    }
  }, [location.pathname, setHeaderVisible]);

  return (
    <>
      <Header visible={headerVisible} />

      <Routes>
        <Route
          path="/"
          element={<HomePage setHeaderVisible={setHeaderVisible} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:categorySlug" element={<GalleryPage />} />
        <Route path="/quotations" element={<QuotationsPage />} />
        <Route path="/store" element={<StorePage />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  const [headerVisible, setHeaderVisible] = useState(false);

  return (
    <BrowserRouter>
      <AppContent headerVisible={headerVisible} setHeaderVisible={setHeaderVisible} />
    </BrowserRouter>
  );
}

export default App;
