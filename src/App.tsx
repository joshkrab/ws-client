import React, {useEffect, useReducer, useRef} from 'react';
import axios from 'axios';
import './App.css';
import EnterMenu from './components/EnterMenu';
import {Websocket} from './components/Websocket';
import {socket} from './contexts/WebsocketContext';
import reducer from './contexts/reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [], 
    messages: [],
  });
  const effectRan = useRef(false);

  const onLogin = async (obj: {
    roomId: string,
    userName: string,
  }) => {

    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    // Create event:
    socket.emit('ROOM:JOIN', obj);
    const {data} = await axios.get(`http://localhost:9001/chat/rooms/${obj.roomId}`);
    setUsers(data.users);
  };
  // 2:23

  const setUsers = (users: string[]) => {
    dispatch({
      type: 'SET_USERS',
      payload: {users: users},
    })
}

// Only for testing:
  useEffect(() => {
    if (effectRan.current === false) {
      socket.on('ROOM:SET_USERS', setUsers);
    };

     // When unmount component: close and open, otherwise it is mounted twice:
    return () => {
      console.log('unmounted');
      effectRan.current = true;
    };
  }, []);

  return (
    <div className='App'>
      {!state.joined ? <EnterMenu onLogin={onLogin} /> : <Websocket {...state} />}
    </div>
  );
};

export default App;
