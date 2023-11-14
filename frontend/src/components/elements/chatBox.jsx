import React from 'react';
//import { useSelector } from 'react-redux';
//import { animateScroll } from 'react-scroll';
//import { useTranslation } from 'react-i18next';

import NewMessageForm from './newMessageForm.jsx';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const ChatBox = () => {

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {"# Channel name"}
          </b>
        </p>
        <span className="text-muted">
          {'Message amount'}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm />
      </div>
    </div>
  );
};

export default ChatBox;