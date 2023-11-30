import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import authImg from '../../assets/autImg.png';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import routes from '../../routes.js';
import { useNavigate } from "react-router-dom";
import TokenContext from '../../contexts/tokenContext';
//import {toast} from 'react-toastify';

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isValidForm, setValidStatus] = useState(true);

  const valiationSchema = Yup.object().shape({
    username: Yup.string().required(t('singUpPage.requiredField')),
    password: Yup.string().required(t('singUpPage.requiredField')),
  });

  return (
    <TokenContext.Consumer>
      {({ updateToken }) => (
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img
                      src={authImg}
                      className="rounded-circle"
                      alt={t('singUpPage.singup')}
                    />
                  </div>
                  <Formik
                    validationSchema={valiationSchema}
                    initialValues={{ username: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                      axios.post(routes.loginApiPath(), values).then((response) => {
                        console.log(response.data);
                        const token = response.data.token;
                        const userName = response.data.username;
                        localStorage.setItem('token', JSON.stringify(token));
                        localStorage.setItem('userName', JSON.stringify(userName));
                        updateToken();
                        navigate(routes.chatPagePath());
                      })
                        .catch(() => {
                          //console.log('Error!');
                          setValidStatus(false);
                        });
                      setSubmitting(false);
                    }}
                  >
                    {({ touched, errors, handleChange, handleSubmit, values }) => (
                      <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                        <h1 className="text-center mb-4">{t('singUpPage.login')}</h1>
                        <Form.Group className="form-floating mb-3">
                          <Form.Control
                            name="username"
                            id="username"
                            autoComplete="username"
                            placeholder={t('singUpPage.username')}
                            className="form-control"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={!isValidForm}
                            required
                          />
                          {errors.username && touched.username ? (
                            <Form.Control.Feedback>{errors.username}</Form.Control.Feedback>
                          ) : null}
                          <label htmlFor="username">{t('singUpPage.username')}</label>
                        </Form.Group>

                        <Form.Group className="form-floating mb-4">
                          <Form.Control
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="password"
                            placeholder={t('singUpPage.password')}
                            className="form-control"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!isValidForm}
                            required
                          />
                          {errors.password && touched.password ? (
                            <Form.Control.Feedback>{errors.password}</Form.Control.Feedback>
                          ) : null}
                          <label htmlFor="password">{t('singUpPage.password')}</label>
                        </Form.Group>

                        <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                          {t('singUpPage.login')}
                        </Button>
                        {!isValidForm ? (<Alert variant={'danger'}>{t('singUpPage.wrongCredentials')}</Alert>) : null}
                      </Form>
                    )}
                  </Formik>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>{t('singUpPage.noAccountQuestion')}</span>
                    {' '}
                    <Link to={routes.signupPagePath()}>{t('singUpPage.signup')}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      )}
    </TokenContext.Consumer>
  );
};
