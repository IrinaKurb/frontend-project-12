import React from 'react';
import { useTranslation } from 'react-i18next';
import authImg from '../../assets/autImg.png';
import { Formik, Field } from 'formik';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
// import {toast} from 'react-toastify';

export const LoginPage = () => {
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    username: Yup.string().required(t('singUpPage.requiredField')),
    password: Yup.string().required(t('singUpPage.requiredField')),
  });

  return (
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
                initialValues={{ username: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">{t('singUpPage.login')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Field
                        name="username"
                        id="username"
                        autoComplete="username"
                        placeholder={t('singUpPage.username')}
                        className="form-control"
                        required
                      />
                      {errors.username && touched.username ? (
                        <Form.Control.Feedback>{errors.username}</Form.Control.Feedback>
                      ) : null}
                      <label htmlFor="username">{t('singUpPage.username')}</label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Field
                        name="password"
                        id="password"
                        autoComplete="password"
                        placeholder={t('singUpPage.password')}
                        className="form-control"
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
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('singUpPage.noAccountQuestion')}</span>
                {' '}
                <Link to="/signup">{t('singUpPage.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
