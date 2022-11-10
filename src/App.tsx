import React, {useReducer} from 'react';
import './App.css';
import EnterMenu from './components/EnterMenu';
import {Websocket} from './components/Websocket';
import {WebsocketProvider, socket} from './contexts/WebsocketContext';
import reducer from './contexts/reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, {joined: false, roomId: null, userName: null});

  const onLogin = (obj:{
			roomId: string,
			userName: string,
  }) => { 

    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    // Create event:
    socket.emit('ROOM:JOIN', obj);
  };

  console.log(state);

  return (
    <WebsocketProvider value={socket}>
      {!state.joined && <EnterMenu onLogin={ onLogin}/>}
    <Websocket />
    </WebsocketProvider>
    
  );
}

export default App;
