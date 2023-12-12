import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import initI18next from './init18next';
import { NotFoundPage } from './components/pages/pageNotFound.jsx';
import { LoginPage } from './components/pages/loginPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import { RegistrationPage } from './components/pages/RegistrationPage.jsx';
import routes from './routes.js';
import TokenContext from './contexts/tokenContext.jsx';
import store from './store/index.js';

import Navbar from './components/elements/navigationPannel.jsx';

const App = () => {

  initI18next();
  const filter = require('leo-profanity');
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const [token, setToken] = useState(null);

  const state = { token, setToken };

  return (
    <Provider store={store}>
      <TokenContext.Provider value={state}>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Navbar />
            <Routes >
              <Route path={routes.chatPagePath()} element={<ChatPage />} />
              <Route path={routes.loginPagePath()} element={<LoginPage />} />
              <Route path={routes.signupPagePath()} element={<RegistrationPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TokenContext.Provider>
    </Provider>
  )
}

/*
class App extends React.Component {
  constructor(props) {
    super(props);
    initI18next();
    const filter = require('leo-profanity');
    filter.add(filter.getDictionary('en'))
    filter.add(filter.getDictionary('ru'))

    this.updateToken = () => {
      this.setState(() => ({
        token: localStorage.getItem('token') !== undefined ? JSON.parse(localStorage.getItem('token')) : ""
      }));
    };

    this.state = {
      token: null,
      updateToken: this.updateToken,
    };
  }

  render() {
    return (
      
    )
  }
}
*/

export default App;
