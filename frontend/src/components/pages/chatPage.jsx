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
import AuthContext from '../../contexts/tokenContext';
//import LoginPage from './loginPage';
import ChannelsBox from '../elements/channelsBox';
import ChatBox from '../elements/chatBox';
import {
  addInitialChannel,
  setCurrentChannelId,
} from '../../slices/channelSlice';
import { addInitialMessages } from '../../slices/messageSlice';
import ModalWindow from '../elements/modalWindows';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoad, setLoad] = useState(true);
  const allAuthContext = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    let didMount = true; // eslint-disable-line
    const requestData = async () => {
      try {
        const response = await axios.get(routes.dataApiPath(), 
          { headers: allAuthContext.getAuthHeader() }); 
        if (didMount) setLoad(false);
        const { channels, messages, currentChannelId } = response.data;
        dispatch(addInitialChannel(channels));
        dispatch(setCurrentChannelId(currentChannelId));
        dispatch(addInitialMessages(messages));
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('unknownError'));
          return;
        }
        if (error.response?.status === 401) {
          if (didMount) setLoad(false);
          navigate(routes.loginPagePath());
        } else {
          toast.error(t('networkError'), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    requestData();
    return () => { didMount = false };
  }, [t, navigate, dispatch, allAuthContext]);

  return !isLoad ? (
    <div className="d-flex flex-column h-100">
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
    </div>
  ) : (
    null
  );
};

export default ChatPage;
