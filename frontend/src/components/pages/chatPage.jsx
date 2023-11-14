import { React, useEffect, useContext } from 'react';
import routes from '../../routes';
import TokenContext from '../../contexts/tokenContext';
import { useNavigate } from "react-router-dom";
//import { useTranslation } from 'react-i18next';
import ChannelsBox from '../elements/channelsBox';
import ChatBox from '../elements/chatBox';

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
      {token ? (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <div className="col p-0 h-100">
              <ChatBox />
            </div>
          </div>
        </div>
      )
        : null};
    </>
  )
}

export default ChatPage;