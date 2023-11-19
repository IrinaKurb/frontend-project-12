import { io } from 'socket.io-client';
import store from './store/index.js';
import { addMessage } from './store/messageSlice.js';


const socket = io('http://localhost:3000');
console.log('create socket');

const { dispatch } = store;

socket.on('newMessage', (newMessage) => {
    console.log("messageForSending: " + JSON.stringify(newMessage));
    dispatch(addMessage(newMessage));
});

export default socket;