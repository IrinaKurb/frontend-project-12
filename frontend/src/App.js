//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/pages/pageNotFound.jsx';
import { LoginPage } from './components/pages/loginPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import routes from './routes.js';
import init from './init.js';
import TokenContext from './contexts/tokenContext.jsx';

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
      token:  JSON.parse(localStorage.getItem('token')),
      updateToken: this.updateToken,
    };
  }

  render() {
    return(
    <TokenContext.Provider value={this.state}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.chatPagePath()} element={<ChatPage/>} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
    )
  }
}

export default App;
