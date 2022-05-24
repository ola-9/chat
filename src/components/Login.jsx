/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Card, Button, Form, Container,
} from 'react-bootstrap';
import { Formik, Field } from 'formik';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';
import loginImage from '../../assets/login.png';

const Login = (props) => {
  const rollbar = useRollbar();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = props;

  const onSubmit = async (values) => {
    rollbar.error('TestError: Hello word');
    setAuthFailed(false);

    try {
      const res = await axios.post(routes.loginPath(), values);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      const { from } = location.state || state || { from: { pathname: '/' } };
      navigate(from, { replace: true });
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        return;
      }
      throw err;
    }
  };

  const { t } = useTranslation('translation', { keyPrefix: 'login' });

  return (
    <Container fluid className="h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Card.Img
                  src={loginImage}
                  className="rounded-circle"
                  alt={t('card.img.alt')}
                />
              </div>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={onSubmit}
              >
                {({ errors, touched, handleSubmit }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">{t('card.form.header')}</h1>
                    <div className="form-floating mb-3">
                      <Field
                        id="username"
                        type="text"
                        name="username"
                        className={(errors.username && touched.username) || authFailed
                          ? 'form-control is-invalid'
                          : 'form-control'}
                        placeholder={t('card.form.username.placeholder')}
                        autoFocus
                      />
                      <label htmlFor="username">{t('card.form.username.label')}</label>
                    </div>
                    <div className="form-floating mb-4 position-relative">
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        className={(errors.password && touched.password) || authFailed
                          ? 'form-control is-invalid'
                          : 'form-control'}
                        placeholder={t('card.form.password.placeholder')}
                      />
                      <label htmlFor="password">{t('card.form.password.label')}</label>
                      {authFailed && (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {t('card.form.errors.auth')}
                        </Form.Control.Feedback>
                      )}
                    </div>
                    <Button type="submit" variant="primary" className="w-100 mb-3">{t('card.form.submitBtn')}</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('card.footer.question')}
                  &nbsp;
                </span>
                <Link to={routes.signupPage()}>
                  {t('card.footer.signup')}
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Login;
