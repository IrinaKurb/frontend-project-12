import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import store from './slices/index.js';
import { addMessage } from './slices/messageSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelSlice.js';

const { dispatch } = store;

const initSocket = (initI18next) => {
  const socket = io();

  const { t } = initI18next;
  
  socket.on('connect', () => {
    toast.success(t('chatPage.messagesForUser.connected'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  });

  socket.on('disconnect', () => {
    toast.error(t('networkError'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  });

  socket.on('newMessage', (newMessage) => {
    dispatch(addMessage(newMessage));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
    toast.success(t('modalWindow.channelCreated'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  });

  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
    toast.success(t('modalWindow.channelRemoved'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  });

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
    toast.success(t('modalWindow.channelRenamed'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  });

  return socket;
};

export default initSocket;
