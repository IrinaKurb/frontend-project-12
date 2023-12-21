import React, {
  useRef,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import require from 'leo-profanity';
import { toast } from 'react-toastify';
import { getCurrentChannelId } from '../../selectors/selectors';
import SocketContext from '../../contexts/socketContext';
import AuthContext from '../../contexts/tokenContext';
import 'react-toastify/dist/ReactToastify.css';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const formikRef = useRef(null);
  const currentChannelId = useSelector(getCurrentChannelId);
  const [isDisabled, setIsDisabled] = useState(false);

  const notSendMessage = () => {
    toast.error(t('chatPage.messagesForUser.messageNotSend'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  socket.on('connect', () => {
    setIsDisabled(false);
  });

  useEffect(() => {
    formikRef.current.focus();
  }, [isDisabled, currentChannelId]);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: ({ body }) => {
      formik.setSubmitting(false);
      setIsDisabled(true);
      if (body.length === 0) {
        setIsDisabled(false);
        return;
      }
      const filter = require('leo-profanity');
      const message = {
        body: filter.clean(body),
        channelId: currentChannelId,
        username: user.username,
      };
      socket.volatile.timeout(3000).emit('newMessage', message, (err) => {
        if (err) {
          notSendMessage();
        } else {
          setIsDisabled(false);
          formik.resetForm();
        }
      });
      formikRef.current.focus();
    },
    validateOnBlur: false,
  });

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
          disabled={isDisabled ? 'disabled' : null}
        />
        <Button variant="group-vertical" type="submit" disabled={isDisabled ? 'disabled' : null}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
