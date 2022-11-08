import React from 'react';
import './App.css';
import {Websocket} from './components/Websocket';
import {WebsocketProvider, socket} from './contexts/WebsocketContext';

function App() {
  return (
    <WebsocketProvider value={socket}>
      <Websocket />
    </WebsocketProvider>
    
  );
}

export default App;
