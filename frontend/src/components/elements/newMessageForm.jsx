import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
//import { useFormik } from 'formik';
//import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
//import leoProfanity from 'leo-profanity';
// import { useRollbar } from '@rollbar/react';

const NewMessageForm = () => {
  const { t } = useTranslation();
  // const rollbar = useRollbar();

  return (
    <Form noValidate className="py-1 border rounded-2">
      <InputGroup>
        <Form.Control
          name="body"
          aria-label={t('chatPage.inputMessage')}
          placeholder={t('chatPage.inputMessage')}
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden"></span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;