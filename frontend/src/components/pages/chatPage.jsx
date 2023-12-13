import {
  React,
  useEffect,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import routes from '../../routes';
import TokenContext from '../../contexts/tokenContext';
import LoginPage from './loginPage';
import ChannelsBox from '../elements/channelsBox';
import ChatBox from '../elements/chatBox';
import {
  addInitialChannel,
  setCurrentChannelId,
} from '../../store/channelSlice';
import { addInitialMessages } from '../../store/messageSlice';
import ModalWindow from '../elements/modalWindows';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const [isLoad, setLoad] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios.get(routes.dataApiPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoad(true);
        const { channels, messages, currentChannelId } = response.data;
        dispatch(addInitialChannel(channels));
        dispatch(setCurrentChannelId(currentChannelId));
        dispatch(addInitialMessages(messages));
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('unknownError'));
        } else {
          toast.error(t('networkError'), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    if (token) {
      requestData();
    } else {
      navigate(routes.loginPagePath());
    }
  }, [t, navigate, token, dispatch]);

  return isLoad ? (
    <div className="d-flex flex-column h-100">
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
      ) : null}
    </div>
  ) : (
    <LoginPage />
  );
};

export default ChatPage;
