import React, { useContext } from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import { useNavigate } from "react-router-dom";
import TokenContext from '../../contexts/tokenContext';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token, updateToken } = useContext(TokenContext);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    navigate(routes.loginPagePath());
    const emptyToken = '';
    const emptyUser = '';
    updateToken();
  
    localStorage.setItem('token', JSON.stringify(emptyToken));
    localStorage.setItem('userName', JSON.stringify(emptyUser));
    dispatch({ type: 'logout' });
  };
  return (
    <>
      {
        <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
          <div className="container">
            <BootstrapNavbar.Brand as={Link} to='/'>{t('chatPage.chatName')}</BootstrapNavbar.Brand>
            {!!token && <Button onClick={() => handleLogOut()}>{t('chatPage.exit')}</Button>}
          </div>
        </BootstrapNavbar>
      }
    </>
  )
};

export default Navbar;