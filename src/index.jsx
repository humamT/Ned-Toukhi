import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from './App';

function setAppHeight() {
  const viewportHeight =
    window.visualViewport?.height ||
    window.innerHeight ||
    document.documentElement.clientHeight;
  const layoutHeight = Math.max(
    window.innerHeight || 0,
    document.documentElement.clientHeight || 0,
    window.visualViewport?.height || 0
  );
  const vh = viewportHeight * 0.01;
  const layoutVh = layoutHeight * 0.01;
  document.documentElement.style.setProperty("--app-vh", `${vh}px`);
  document.documentElement.style.setProperty("--orb-layout-vh", `${layoutVh}px`);
}

setAppHeight();
window.addEventListener("resize", setAppHeight, { passive: true });
window.addEventListener("orientationchange", setAppHeight, { passive: true });
window.visualViewport?.addEventListener("resize", setAppHeight, { passive: true });
window.visualViewport?.addEventListener("scroll", setAppHeight, { passive: true });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
