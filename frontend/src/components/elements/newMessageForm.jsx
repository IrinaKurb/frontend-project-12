import React, { useRef, useContext, useEffect } from 'react';
import SocketContext from '../../contexts/socketContext';
import { Formik, Field } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
//import { useFormik } from 'formik';
//import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
//import leoProfanity from 'leo-profanity';
// import { useRollbar } from '@rollbar/react';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const formikRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('userName'));
  const currentChannelId = useSelector((state) => state.channelsStore.currentChannelId);
  let isDisabled = false;

  const notSendMessage = () => {
    toast.error(t('chatPage.messagesForUser.messageNotSend'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (values.body.length === 0) return;
        const filter = require('leo-profanity');

        socket.timeout(1000).emit('newMessage',
          { body: filter.clean(values.body), channelId: currentChannelId, username: currentUser },
          (err) => {
            if (err) {
              isDisabled = true;
              resetForm();
              notSendMessage();
            } else {
              isDisabled = '';
              setSubmitting(false);
              resetForm();
              formikRef.current.focus();
            }
          });
      }}>
      {({ handleSubmit }) => (
        <Form noValidate className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <InputGroup>
            <Field
              innerRef={formikRef}
              autoFocus={true}
              type="body"
              name="body"
              className="form-control border-0 p-0 ps-2"
              aria-label={t('chatPage.inputMessage')}
              placeholder={t('chatPage.inputMessage')}
              disabled={isDisabled}
            >
            </Field>
            <Button variant="group-vertical" type="submit" disabled={isDisabled}>
              <ArrowRightSquare size={20} />
              <span className="visually-hidden"></span>
            </Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
