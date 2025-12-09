import { useEffect } from "react";
import "./App.scss";

const App = () => {
  useEffect(() => {
    fetch("http://127.0.0.1:8787/")
      .then(res => res.json())
      .then(data => console.log("Backend says:", data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div>
      <h1>React + Cloudflare connected ✅</h1>
      <p>Open the browser console (F12) to see the message.</p>
    </div>
  );
};

export default App;