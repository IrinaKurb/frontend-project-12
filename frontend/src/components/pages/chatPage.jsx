import { React, useEffect, useContext } from 'react';
import routes from '../../routes';
import TokenContext from '../../contexts/tokenContext';
import { useNavigate } from "react-router-dom";
//import { useTranslation } from 'react-i18next';
import ChannelsBox from '../elements/channelsBox';
import ChatBox from '../elements/chatBox';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addChannel } from '../../store/channelSlice';
import { addMessage } from '../../store/messageSlice';

function ChatPage() {
  //const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      axios.get(routes.dataApiPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        const channels = response.data.channels;
        const messages = [
          {userName: 'a', body:'1111'},
          {userName: 'b', body:'2222'},
      ];
        console.log(messages);
        dispatch(addChannel(channels));
        dispatch(addMessage(messages));
      });
    } else {
      navigate(routes.loginPagePath());
    }
  }, []);

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