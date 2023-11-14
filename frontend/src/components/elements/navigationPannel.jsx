import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { t } = useTranslation();
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">{t('chatPage.chatName')}</BootstrapNavbar.Brand>
        {<Button onClick={()=>(console.log('Click LogOut!'))}>{t('chatPage.exit')}</Button>}
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;