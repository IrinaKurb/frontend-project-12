import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import authImg from '../../assets/autImg.png';
import routes from '../../routes.js';
import TokenContext from '../../contexts/tokenContext';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { setToken } = useContext(TokenContext);
  const [isValidForm, setIsValidForm] = useState(true);
  const [isActiveBtn, setIsActiveBtn] = useState(true);

  const valiationSchema = Yup.object().shape({
    username: Yup.string().required(t('singUpPage.requiredField')),
    password: Yup.string().required(t('singUpPage.requiredField')),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
                validationSchema={valiationSchema}
                initialValues={{ username: '', password: '' }}
                onSubmit={(
                  values,
                  { setSubmitting },
                ) => {
                  axios.post(routes.loginApiPath(), values).then((response) => {
                    const upDateToken = response.data.token;
                    const userName = response.data.username;
                    localStorage.setItem('token', JSON.stringify(upDateToken));
                    localStorage.setItem('userName', JSON.stringify(userName));
                    setToken(upDateToken);
                    navigate(routes.chatPagePath());
                    setIsActiveBtn(false);
                  }).catch((error) => {
                    if (!error.isAxiosError) {
                      toast.error(t('unknownError'));
                      return;
                    }
                    if (error.response.status === 401) {
                      setIsValidForm(false);
                      inputRef.current.select();
                    } else {
                      toast.error(t('networkError'), {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                      setIsValidForm(true);
                    }
                  });
                  setSubmitting(false);
                  setIsActiveBtn(true);
                }}
              >
                {({
                  touched,
                  errors,
                  handleChange,
                  handleSubmit,
                  values,
                }) => (
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
                        ref={inputRef}
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
                      <label className="form-label" htmlFor="password">{t('singUpPage.password')}</label>
                      {!isValidForm && <Form.Control.Feedback type="invalid" tooltip>{t('singUpPage.wrongCredentials')}</Form.Control.Feedback>}
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                      disabled={!isActiveBtn ? 'disabled' : null}
                    >
                      {t('singUpPage.login')}
                    </Button>
                    <ToastContainer />
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('singUpPage.noAccountQuestion')}</span>
                <Link to={routes.signupPagePath()}>{t('singUpPage.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
