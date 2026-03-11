import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {loadConfig} from "./lib/configStorage";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

