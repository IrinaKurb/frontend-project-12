//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/pages/pageNotFound.jsx';
import { LoginPage } from './components/pages/loginPage.jsx';
import { RegistratePage } from './components/pages/registratePage.jsx';
import routes from './routes.js';
import init from './init.js';

function App() {
  init;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}>
          <Route path={routes.signupPath()} element={<RegistratePage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
