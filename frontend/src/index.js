import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 
import './index.css';  

// Add TomTom CSS
const tomtomCSS = document.createElement('link');
tomtomCSS.rel = 'stylesheet';
tomtomCSS.type = 'text/css';
tomtomCSS.href = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.23.0/maps/maps.css';
document.head.appendChild(tomtomCSS);

// Add TomTom Scripts
const loadTomTomScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.23.0/maps/maps-web.min.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

// Load TomTom and then render the app
loadTomTomScript()
  .then(() => {
    // Create a root.
    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);

    // Render the application
    root.render(
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    );
  })
  .catch(error => {
    console.error('Error loading TomTom SDK:', error);
  });