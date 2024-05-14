import React from 'react';
import ReactDOM from 'react-dom/client';  // Importando o cliente ReactDOM corretamente
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'));  // Uso de createRoot para React 18+
root.render(
  <React.StrictMode>
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
