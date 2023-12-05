//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/pages/pageNotFound.jsx';
import { LoginPage } from './components/pages/loginPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import { RegistrationPage } from './components/pages/RegistrationPage.jsx';
import routes from './routes.js';
import TokenContext from './contexts/tokenContext.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import initI18next from './init18next';

import Navbar from './components/elements/navigationPannel.jsx';

import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

class App extends React.Component {
  constructor(props) {
    super(props);
    initI18next();
    const filter = require('leo-profanity');
    filter.loadDictionary('ru');

    this.updateToken = () => {
      this.setState(() => ({
        token: JSON.parse(localStorage.getItem('token'))
      }));

      const rollbarConfig = {
        accessToken: 'cd8eec1286324a69ae13f47aac11eeb4',
        environment: 'testenv',
      };
    };

    this.state = {
      token: JSON.parse(localStorage.getItem('token')),
      updateToken: this.updateToken,
    };
  }

  render() {
    return (
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <TokenContext.Provider value={this.state}>
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
        </ErrorBoundary>
      </Provider >
    )
  }
}

export default App;
