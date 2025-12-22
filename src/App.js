import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/Home.jsx";
import AboutPage from "./pages/about/About.jsx";
import ContactPage from "./pages/contact/Contact.jsx";
import GalleryPage from "./pages/gallery/Gallery.jsx";
import QuotationsPage from "./pages/quotations/Quotations.jsx";
import StorePage from "./pages/store/Store.jsx";
import Footer from "./components/footer/footer.jsx";
import Header from "./components/header/header.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/quotations" element={<QuotationsPage />} />
        <Route path="/store" element={<StorePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

// const App = () => {
//   useEffect(() => {
//     fetch("http://127.0.0.1:8787/")
//       .then(res => res.json())
//       .then(data => console.log("Backend says:", data))
//       .catch(err => console.error("Fetch error:", err));
//   }, []);

//   return (
//     <div>
//       <h1>React + Cloudflare connected ✅</h1>
//       <p>Open the browser console (F12) to see the message.</p>
//     </div>
//   );
// };

// export default App;

