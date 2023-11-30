import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import { useNavigate } from "react-router-dom";
//import axios from 'axios';
import TokenContext from '../../contexts/tokenContext';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogOut = (updateToken) => {
    console.log('Click LogOut!');
    navigate(routes.loginPagePath()); //работает только переход на новую страницу, разлогирования нет
    const emptyToken = '';
    const emptyUser = '';
    localStorage.setItem('token', JSON.stringify(emptyToken));
    localStorage.setItem('userName', JSON.stringify(emptyUser));
    dispatch({type: 'logout'});
    console.log(updateToken)

  };
  return (
    <TokenContext.Consumer>
      {(updateToken) => (
        <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <BootstrapNavbar.Brand as={Link} to={routes.loginPagePath()}>{t('chatPage.chatName')}</BootstrapNavbar.Brand>
            {<Button onClick={() => handleLogOut(updateToken)}>{t('chatPage.exit')}</Button>}
          </div>
        </BootstrapNavbar>
      )}
    </TokenContext.Consumer>
  )
};

export default Navbar;