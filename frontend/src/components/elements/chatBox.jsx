import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
//import { animateScroll } from 'react-scroll';
//import { useTranslation } from 'react-i18next';
import NewMessageForm from './newMessageForm.jsx';
import { useTranslation } from 'react-i18next';
import { getMessagesForCurrentChannel, getCurrentChannel } from '../../selectors';
//import { useDispatch } from 'react-redux';

const Message = ({ user, textMessage }) => {
  return (
    <div className="text-break mb-2">
      <b>{user}</b>
      {': '}
      {textMessage}
    </div>
  )
};

const ChatBox = () => {
  //const dispatch = useDispatch();
  const { t } = useTranslation();
  //console.log(state);

  const currentChannel = useSelector(getCurrentChannel);
  const currentMessages = useSelector(getMessagesForCurrentChannel);

  console.log(currentMessages);
  useEffect(() => {

  }, [currentMessages.length]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${currentChannel?.name}`}
          </b>
        </p>
        <span className="text-muted">
          {t('chatPage.messages', { count: currentMessages.length })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {currentMessages.map((message) => (
          <Message
            key={message.id}
            user={message.username}
            textMessage={message.body}
          />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm />
      </div>
    </div>
  );
};

export default ChatBox;
