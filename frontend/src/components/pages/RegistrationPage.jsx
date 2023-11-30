//import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
// import { useRollbar } from '@rollbar/react';

//import { useAuth } from '../hooks/index.js';
//import routes from '../../routes.js';

import registrationImg from '../../assets/registrationImg.png';


export const RegistrationPage = () => {
  const { t } = useTranslation();
  //const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  console.log(registrationFailed, setRegistrationFailed);
  const inputRef = useRef();
  //const navigate = useNavigate();
  // const rollbar = useRollbar();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup
      .string()
      .trim()
      .required('registrationPage.errors.required')
      .min(3, 'registrationPage.errors.minLength')
      .max(20, 'registrationPage.errors.maxLength'),
    password: Yup
      .string()
      .trim()
      .required('registrationPage.errors.required')
      .min(6, 'registrationPage.errors.minPasswordLength'),
    confirmPassword: Yup
      .string()
      .test('registrationPage.confPassword', 'registrationPage.errors.samePassword',
        (value, context) => value === context.parent.password),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={registrationImg}
                  className="rounded-circle"
                  alt={t('registrationPage.title')}
                />
              </div>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                onSubmit={(values) => {
                  console.log(values)
                }}
              >
                {({ touched, handleBlur, handleChange, handleSubmit, errors, values }) => (
                  <Form onSubmit={handleSubmit} className="w-50">
                    <h1 className="text-center mb-4">{t('registrationPage.title')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder={t('registrationPage.userName')}
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={
                          (errors.username && touched.username)
                          || registrationFailed
                        }
                        required
                        ref={inputRef}
                      />
                      <Form.Label htmlFor="username">{t('registrationPage.userName')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip placement="right">
                        {t(errors.username)}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder={t('registrationPage.errors.minLength')}
                        name="password"
                        id="password"
                        aria-describedby="passwordHelpBlock"
                        isInvalid={
                          (errors.password && touched.password)
                          || registrationFailed
                        }
                        required
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {t(errors.password)}
                      </Form.Control.Feedback>
                      <Form.Label htmlFor="password">{t('registrationPage.password')}</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        placeholder={t('registrationPage.errors.samePassword')}
                        name="confirmPassword"
                        id="confirmPassword"
                        isInvalid={
                          (errors.confirmPassword && touched.confirmPassword)
                          || registrationFailed
                        }
                        required
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {registrationFailed
                          ? t('registrationPage.errors.sameUser')
                          : t(errors.confirmPassword)}
                      </Form.Control.Feedback>
                      <Form.Label htmlFor="confirmPassword">{t('registrationPage.confPassword')}</Form.Label>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" className="w-100">{t('registrationPage.regisration')}</Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

