import React, { useRef } from 'react';
import { Formik, Field } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
//import { useFormik } from 'formik';
//import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
//import leoProfanity from 'leo-profanity';
// import { useRollbar } from '@rollbar/react';
import socket from '../../socket';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const formikRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('userName'));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  let isDisabled = false;
  // console.log(currentUser);
  // const rollbar = useRollbar();

  const notSendMessage = () => {
    toast.error(t('chatPage.messagesForUser.messageNotSend'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, { setSubmitting, resetForm }) => {

        socket.timeout(5000).emit('newMessage', { body: values.body, channelId: currentChannelId, username: currentUser }, (err, response) => {
          if (err) {
            console.log("can't find server");
            isDisabled = true;
            resetForm();
            notSendMessage();
          } else {
            console.log('conection with the server is ' + response.status);
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
            <ToastContainer />
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
