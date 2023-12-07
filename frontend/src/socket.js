import { io } from 'socket.io-client';
import store from './store/index.js';
import { addMessage } from './store/messageSlice.js';
import { addChannel, removeChannel, renameChannel } from './store/channelSlice.js';
import { toast } from "react-toastify";

const { dispatch } = store;

const initSocket = (i18n) => {
    const socket = io('http://localhost:5001');
    const { t } = i18n();

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