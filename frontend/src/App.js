//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/pages/pageNotFound.jsx';
import { LoginPage } from './components/pages/loginPage.jsx';
import { ChatPage } from './components/pages/chatPage.jsx';
import routes from './routes.js';
import init from './init.js';

function App() {
  init;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.chatPagePath()} element={<ChatPage />} />
        <Route path={routes.loginPagePath()} element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
  
export default App;
