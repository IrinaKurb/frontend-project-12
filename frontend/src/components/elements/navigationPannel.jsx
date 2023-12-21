import React, { useContext } from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/tokenContext';

const Navbar = () => {
  const { t } = useTranslation();
  const { logOut, user } = useContext(AuthContext);
 
  return (
    <div>
      <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
        <div className="container">
          <BootstrapNavbar.Brand as={Link} to="/">{t('chatPage.chatName')}</BootstrapNavbar.Brand>
          {!!user && <Button onClick={logOut}>{t('chatPage.exit')}</Button>}
        </div>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
