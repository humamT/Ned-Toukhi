// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import "./App.css"; // we’ll add CSS here

function Designs() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    fetch("http://ned-toukhi.local/wp-json/wp/v2/posts")
      .then((res) => res.json())
      .then((data) => setDesigns(data));
  }, []);

  return (
    <div className="designs-container">
      {designs.map((design) => (
        <div className="design-card" key={design.id}>
          <h2>{design.title.rendered}</h2>
          {design.featured_media_url && (
            <img src={design.featured_media_url} alt={design.title.rendered} />
          )}
          <div
            className="design-content"
            dangerouslySetInnerHTML={{ __html: design.content.rendered }}
          />
        </div>
      ))}
    </div>
  );
}

export default Designs;

