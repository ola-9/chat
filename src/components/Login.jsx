/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Card, Button, Form, Container,
} from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import loginImage from '../../assets/login.png';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup.string().required('необходимо ввести логин'),
  password: yup.string().required('необходимо ввести пароль'),
});

const Login = (props) => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = props;

  const onSubmit = async (values) => {
    setAuthFailed(false);

    try {
      const res = await axios.post(routes.loginPath(), values);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      console.log('loggedIn inside Login: ', auth.loggedIn);
      const { from } = location.state || state || { from: { pathname: '/' } };
      navigate(from, { replace: true });
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        console.log('неверный логин или пароль');
        return;
      }
      throw err;
    }
  };

  return (
    <Container fluid className="h-100">
      {/* <Navigation /> */}
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Card.Img
                  src={loginImage}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched, handleSubmit }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                  >
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field
                        id="username"
                        type="text"
                        name="username"
                        className={(errors.username && touched.username) || authFailed
                          ? 'form-control is-invalid'
                          : 'form-control'}
                        placeholder="Ваш ник"
                        autoFocus
                      />
                      <label htmlFor="username">Ваш ник</label>
                      <ErrorMessage name="username">
                        {(msg) => <div className="text-danger fw-lighter fs-6">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="form-floating mb-4 position-relative">
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        className={(errors.password && touched.password) || authFailed
                          ? 'form-control is-invalid'
                          : 'form-control'}
                        placeholder="Пароль"
                      />
                      <label htmlFor="password">Пароль</label>
                      <ErrorMessage name="password">
                        {(msg) => <div className="text-danger fw-lighter fs-6">{msg}</div>}
                      </ErrorMessage>
                      {authFailed && (
                        <Form.Control.Feedback type="invalid" tooltip>
                          Неверные имя пользователя или пароль
                        </Form.Control.Feedback>
                      )}
                    </div>
                    <Button type="submit" variant="primary" className="w-100 mb-3">Войти</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?&nbsp;</span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Login;
