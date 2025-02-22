import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; 

// Create a root.
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <Router> {/* Router should only be here */}
      <App />
    </Router>
  </React.StrictMode>
);
