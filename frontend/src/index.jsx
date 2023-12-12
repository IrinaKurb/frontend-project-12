import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import initSocket from './socket';
import initI18next from './init18next';
import SocketContext from './contexts/socketContext';


const app = async () => {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        const socket = initSocket(initI18next);
        root.render(
                <SocketContext.Provider value={socket}>
                        <App />
                </SocketContext.Provider>
        );
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
app();
reportWebVitals();
