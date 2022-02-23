import React from 'react';
import ReactDOM from 'react-dom';
import './components/stylesheets/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <React.StrictMode>
      <CookiesProvider>
          <App />
      </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
