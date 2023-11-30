import { io } from 'socket.io-client';
import store from './store/index.js';
import { addMessage } from './store/messageSlice.js';
import { addChannel, removeChannel, renameChannel } from './store/channelSlice.js';
import { toast } from "react-toastify";

const { dispatch } = store;

const initSocket = (i18n) => {
    const socket = io('http://localhost:3000');
    const { t } = i18n();
    // console.log('create socket');

    socket.on('connect', () => {
        toast.success(t('chatPage.messagesForUser.connected'), {
            position: toast.POSITION.TOP_RIGHT,
        });
    });

    socket.on('disconnect', () => {
        toast.error(t('chatPage.messagesForUser.disconnected'), {
            position: toast.POSITION.TOP_RIGHT,
        });
    });

    socket.on('newMessage', (newMessage) => {
        console.log("messageForSending: " + JSON.stringify(newMessage));
        dispatch(addMessage(newMessage));
    });

    socket.on('newChannel', (payload) => {
        dispatch(addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
        dispatch(removeChannel(payload));
    });

    socket.on('renameChannel', (payload) => {
        console.log(payload);
        dispatch(renameChannel(payload));
      });
    
    return socket;
};

export default initSocket;