import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import initSocket from './socket';
import initI18next from './init18next';
import SocketContext from './contexts/socketContext';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const socket = initSocket(initI18next);
  root.render(
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>,
  );
};

app();
