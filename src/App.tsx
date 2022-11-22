import React, {useEffect, useReducer, useRef} from 'react';
import axios from 'axios';
import './App.css';
import EnterMenu from './components/EnterMenu';
import {Websocket} from './components/Websocket';
import {socket} from './contexts/WebsocketContext';
import reducer, {IMessage} from './contexts/reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [], 
    messages: [],
    userWrite: '',
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
    //const {data} = await axios.get(`http://localhost:9001/chat/rooms/${obj.roomId}`);
    const {data} = await axios.get(`https://chatttist.herokuapp.com/chat/rooms/${obj.roomId}`);
    //setUsers(data.users);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    })
  };

  const setUsers = (users: string[]) => {
    dispatch({
      type: 'SET_USERS',
      payload: {users: users},
    })
  }

  const setMessage = (message: IMessage) => {
    dispatch({
      type: 'SET_MESSAGES',
      payload: message,
    })
  }

  const setWriteMonitor = (userName: string) => {
    dispatch({
      type: 'SET_USER_WRITE',
      payload: {userName: userName},
    })
  }

  const removeWriteMonitor = (roomId: string) => {
    dispatch({
      type: 'REMOVE_USER_WRITE',
      payload: {roomId},
    })
  }

  useEffect(() => {
    if (effectRan.current === false) {
      socket.on('ROOM:SET_USERS', setUsers);
      socket.on('ROOM:NEW_MESSAGE', setMessage);
      socket.on('FE:USER_WRITE', setWriteMonitor);
      socket.on('FE:USER_BLUR', removeWriteMonitor);
    };

     // When unmount component: close and open, otherwise it is mounted twice:
    return () => {
      console.log('unmounted');
      effectRan.current = true;
    };
  }, []);

  return (
    <div className='App'>
      {!state.joined ? <EnterMenu onLogin={onLogin} /> : <Websocket {...state} addMessage={setMessage} />}
    </div>
  );
};

export default App;
