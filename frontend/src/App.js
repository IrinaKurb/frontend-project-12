//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/pages/pageNotFound.jsx';
import { LoginPage } from './components/pages/loginPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import routes from './routes.js';
import init from './init.js';
import TokenContext from './contexts/tokenContext.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';

import Navbar from './components/elements/navigationPannel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    init;

    this.updateToken = () => {
      this.setState(() => ({
        token: JSON.parse(localStorage.getItem('token'))
      }));
    };

    this.state = {
      token: JSON.parse(localStorage.getItem('token')),
      updateToken: this.updateToken,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <TokenContext.Provider value={this.state}>
          <BrowserRouter>
            <div className="d-flex flex-column h-100">
              <Navbar />
              <Routes >
                <Route path={routes.chatPagePath()} element={<ChatPage />} />
                <Route path={routes.loginPagePath()} element={<LoginPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TokenContext.Provider>
      </Provider>
    )
  }
}

export default App;
