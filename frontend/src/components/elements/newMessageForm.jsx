import React, { useRef, useState, useContext, useEffect } from 'react';
import SocketContext from '../../contexts/socketContext';
import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const formikRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('userName'));
  const currentChannelId = useSelector((state) => state.channelsStore.currentChannelId);
  const [isDisabled, setIsDisabled] = useState(false);

  const notSendMessage = () => {
    toast.error(t('chatPage.messagesForUser.messageNotSend'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: ({ body }) => {
      formik.setSubmitting(false);
      if (body.length === 0) return;
      const filter = require('leo-profanity');
      const message = { body: filter.clean(body), channelId: currentChannelId, username: currentUser };
      socket.timeout(3000).emit('newMessage', message, (err, response) => {
        console.log(err, response);
          if (err) {
            console.log('I am in error')
            setIsDisabled(true);
            notSendMessage();
          } else {
            console.log('It is OK!')
            formik.resetForm();
            setIsDisabled(false);
          }
        });
      formik.setSubmitting(false);
      formikRef.current.focus();
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    formikRef.current.focus();
  }, [isDisabled]);


  //const disabled = isDisabled ? 'disabled' : null;

  return (
    <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          ref={formikRef}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name="body"
          className="form-control border-0 p-0 ps-2"
          aria-label={t('chatPage.ariaLabelMsg')}
          placeholder={t('chatPage.inputMessage')}
          disabled={isDisabled ? "disabled" : null}
        >
        </Form.Control>
        <Button variant="group-vertical" type="submit" disabled={isDisabled ? "disabled" : null}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden"></span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
