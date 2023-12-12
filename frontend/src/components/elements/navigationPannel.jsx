/* eslint-disable functional/no-expression-statement */
import React, { useContext } from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import routes from '../../routes';
import TokenContext from '../../contexts/tokenContext';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token, setToken } = useContext(TokenContext);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    navigate(routes.loginPagePath());
    const emptyToken = '';
    const emptyUser = '';
    setToken(emptyToken);

    localStorage.setItem('token', JSON.stringify(emptyToken));
    localStorage.setItem('userName', JSON.stringify(emptyUser));
    dispatch({ type: 'logout' });
  };
  return (
    <div>
      <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
        <div className="container">
          <BootstrapNavbar.Brand as={Link} to="/">{t('chatPage.chatName')}</BootstrapNavbar.Brand>
          {!!token && <Button onClick={() => handleLogOut()}>{t('chatPage.exit')}</Button>}
        </div>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
