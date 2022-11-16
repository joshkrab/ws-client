import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {WebsocketProvider, socket} from './contexts/WebsocketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WebsocketProvider value={socket}>
      <App />
    </WebsocketProvider>
  </React.StrictMode >
);

