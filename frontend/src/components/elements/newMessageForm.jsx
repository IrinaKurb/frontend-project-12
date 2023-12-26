import React, {
  useRef,
  useContext,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { getCurrentChannelId } from '../../selectors/selectors';
import SocketContext from '../../contexts/socketContext';
import AuthContext from '../../contexts/tokenContext';
import 'react-toastify/dist/ReactToastify.css';

const NewMessageForm = () => {
  const { t } = useTranslation();
  const { sendMsg } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const formikRef = useRef(null);
  const currentChannelId = useSelector(getCurrentChannelId);

  const notSendMessage = () => {
    toast.error(t('chatPage.messagesForUser.messageNotSend'), {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }) => {
      if (body.length === 0) return;
      const message = {
        body: filter.clean(body),
        channelId: currentChannelId,
        username: user.username,
      };
      try {
        await sendMsg(message);
        formik.resetForm();
      } catch {
        notSendMessage();
      }
      formik.setSubmitting(false);
      formikRef.current.focus();
    },
    validateOnBlur: false,
  });

  useEffect(() => {
    formikRef.current.focus();
  }, [formik.isSubmitting, currentChannelId]);

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
          disabled={formik.isSubmitting}
        />
        <Button variant="group-vertical" type="submit" disabled={formik.isSubmitting}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
