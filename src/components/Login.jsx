/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(4),
});

// const onSubmit = (values) => {
//   console.log('form data: ', values);
// };

const Login = (props) => {
  const auth = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = props;

  const onSubmit = async (values) => {
    console.log('form data: ', values);
    setAuthFailed(false);

    try {
      const res = await axios.post(routes.loginPath(), values);
      console.log(res.data);
      auth.logIn();
      const { from } = location.state || state || { from: { pathname: '/' } };
      navigate(from);
    } catch (err) {
      console.log("you've got error: ", err);
      if (err.isAxiosError && err.response.status === 401) {
        setAuthFailed(true);
        console.log('неверный логин или пароль');
        return;
      }
      throw err;
    }
  };

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="shadow-sm">
          <Card.Body>
            <h1 className="text-center mb-4">Войти</h1>
            <Card.Img src="./assets/login.jpeg" />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="form-floating mb-3">
                  <Field
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Ваш ник"
                    autoFocus
                  />
                  <label htmlFor="username">Ваш ник</label>
                  <ErrorMessage name="username" />
                </div>
                <div className="form-floating mb-3">
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Пароль"
                  />
                  <label htmlFor="password">Пароль</label>
                  <ErrorMessage name="password" />
                </div>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
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
  );
};

export default Login;
