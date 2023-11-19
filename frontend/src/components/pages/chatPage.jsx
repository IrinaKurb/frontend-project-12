import { React, useEffect, useContext } from 'react';
import routes from '../../routes';
import TokenContext from '../../contexts/tokenContext';
import { useNavigate } from "react-router-dom";
//import { useTranslation } from 'react-i18next';
import ChannelsBox from '../elements/channelsBox';
import ChatBox from '../elements/chatBox';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addChannelsFromStore, setCurrentChannelId } from '../../store/channelSlice';
import { addMessagesFromStore } from '../../store/messageSlice';

function ChatPage() {
  //const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const requestData = async () => {
      const response = await axios.get(routes.dataApiPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      /*axios.post('/api/v1/signup', { username: 'newuser', password: '123456' }).then((response) => {
        console.log(response.data); // => { token: ..., username: 'newuser' }
      });*/

      const { channels,  messages, currentChannelId } = response.data;
      dispatch(addChannelsFromStore(channels));
      dispatch(setCurrentChannelId(currentChannelId));
      dispatch(addMessagesFromStore(messages));
    };
    
    if (token) {
      requestData();
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