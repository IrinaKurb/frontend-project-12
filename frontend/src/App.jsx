/* eslint-disable global-require */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import initI18next from './init18next.js';
import initLeoprofanity from './initLeoprof.js';
import NotFoundPage from './components/pages/pageNotFound.jsx';
import LoginPage from './components/pages/loginPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import RegistrationPage from './components/pages/RegistrationPage.jsx';
import routes from './routes.js';
import AuthContext from './contexts/tokenContext.jsx';
import store from './slices/index.js';
import Navbar from './components/elements/navigationPannel.jsx';
import './App.css';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <AuthContext.Provider value={
        {
          logIn, logOut, getAuthHeader, user,
        }
    }>
      { children }
    </AuthContext.Provider>
  );
};

const App = () => {
  initI18next();
  initLeoprofanity();

  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Navbar />
            <Routes>
              <Route path={routes.chatPagePath()} element={<ChatPage />} />
              <Route path={routes.loginPagePath()} element={<LoginPage />} />
              <Route path={routes.signupPagePath()} element={<RegistrationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

export default App;
