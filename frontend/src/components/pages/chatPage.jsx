import { React, useEffect, useContext } from 'react';
import routes from '../../routes';
import TokenContext from '../../contexts/tokenContext';
import { useNavigate } from "react-router-dom";
//import { useTranslation } from 'react-i18next';

function ChatPage() {
  //const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    console.log(token);
    if (!token) {
      navigate(routes.loginPagePath());
    }
  })

  return (
    <>
      {token ? (<div>
        <h1 className="center-align">
          {"Здесь будет чат"}
        </h1>
      </div>) : null};
    </>
  )
}

export default ChatPage;