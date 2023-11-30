import { React, useEffect, useContext, useState } from 'react';
import routes from '../../routes';
import TokenContext from '../../contexts/tokenContext';
import { useNavigate } from "react-router-dom";
//import { useTranslation } from 'react-i18next';
import ChannelsBox from '../elements/channelsBox';
import ChatBox from '../elements/chatBox';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addInitialChannel, setCurrentChannelId } from '../../store/channelSlice';
import { addInitialMessages } from '../../store/messageSlice';
import ModalWindow from '../elements/modalWindows';

const ChatPage = () => {
  //const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const [isLoad, setLoad] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("рендерится ChatPage");
    const requestData = async () => {
      const response = await axios.get(routes.dataApiPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoad(true);
      //console.log(response);
      const { channels, messages, currentChannelId } = response.data;
      dispatch(addInitialChannel(channels));
      dispatch(setCurrentChannelId(currentChannelId));
      dispatch(addInitialMessages(messages));
    };

    if (token) {
      requestData();
    } else {
      navigate(routes.loginPagePath());
    }
  }, []);

  return isLoad ? (
    <>
      {token ? (
        <>
        <ModalWindow />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <div className="col p-0 h-100">
              <ChatBox />
            </div>
          </div>
        </div>
        </>
      )
        : null};
    </>
  ) : null
}

export default ChatPage;