import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import initSocket from './socket';
import initI18next from './init18next';
import initLeoprofanity from './initLeoprof';
import SocketContext from './contexts/socketContext';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const init18next = await initI18next();
  initLeoprofanity();
  const socket = initSocket(init18next);

  const socketApi = {
    sendMsg: (message) => socket.timeout(3000).emitWithAck('newMessage', message),
    addChannel: (channel) => socket.timeout(3000).emitWithAck('newChannel', channel),
    deleteChannel: (channel) => socket.timeout(3000).emitWithAck('removeChannel', channel),
    changeNameChannel: (channel) => socket.timeout(3000).emitWithAck('renameChannel', channel),
  };

  root.render(
    <SocketContext.Provider value={socketApi}>
      <App />
    </SocketContext.Provider>,
  );
};

app();
