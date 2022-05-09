/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Container, Card, Form, Button,
} from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupImage from '../../assets/signup.png';
import { getSignupSchema } from '../yupSchema.js';
import routes from '../routes.js';
import useAuth from '../hooks/index.jsx';

const Signup = () => {
  const [signUpFailed, setSignUpFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const schema = getSignupSchema();

  const onSubmit = async (values) => {
    // console.log('click on submit: ', values);
    try {
      const res = await axios
        .post(
          routes.signupPath(),
          { username: values.username, password: values.password },
        );
      // console.log(res);
      localStorage.setItem('userId', JSON.stringify(res.data));
      auth.logIn();
      navigate('/', { replace: true });
    } catch (err) {
      // console.log('err: ', err.response.status);
      if (err.isAxiosError && err.response.status === 409) {
        setSignUpFailed(true);
        return;
      }
      throw err;
    }
  };

  const { t } = useTranslation('translation', { keyPrefix: 'signup' });

  return (
    <Container fluid className="h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Card.Img
                  src={SignupImage}
                  className="rounded-circle"
                  alt={t('card.img.alt')}
                />
              </div>
              <Formik
                initialValues={{ username: '', password: '', passwordConfirmation: '' }}
                validationSchema={schema}
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
                        className={(errors.username && touched.username) || signUpFailed
                          ? 'form-control is-invalid'
                          : 'form-control'}
                        placeholder={t('card.form.username.placeholder')}
                        autoFocus
                      />
                      <label htmlFor="username">{t('card.form.username.label')}</label>
                      <ErrorMessage name="username">
                        {(msg) => <Form.Control.Feedback type="invalid" tooltip>{msg}</Form.Control.Feedback>}
                      </ErrorMessage>
                      {signUpFailed
                        ? <Form.Control.Feedback type="invalid" tooltip />
                        : null}
                    </div>
                    <div className="form-floating mb-4 position-relative">
                      <Field
                        id="password"
                        type="password"
                        name="password"
                        className={(errors.password && touched.password) || signUpFailed
                          ? 'form-control is-invalid'
                          : 'form-control'}
                        placeholder={t('card.form.password.placeholder')}
                      />
                      <label htmlFor="password">{t('card.form.password.label')}</label>
                      <ErrorMessage name="password">
                        {(msg) => <Form.Control.Feedback type="invalid" tooltip>{msg}</Form.Control.Feedback>}
                      </ErrorMessage>
                      {signUpFailed
                        ? <Form.Control.Feedback type="invalid" tooltip />
                        : null}
                    </div>
                    <div className="form-floating mb-4 position-relative">
                      <Field
                        id="passwordConfirmation"
                        type="password"
                        name="passwordConfirmation"
                        className={
                          (errors.passwordConfirmation && touched.passwordConfirmation)
                            || signUpFailed
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }
                        placeholder={t('card.form.passwordConfirmation.placeholder')}
                      />
                      <label htmlFor="passwordConfirmation">{t('card.form.passwordConfirmation.label')}</label>
                      <ErrorMessage name="passwordConfirmation">
                        {(msg) => <Form.Control.Feedback type="invalid" tooltip>{msg}</Form.Control.Feedback>}
                      </ErrorMessage>
                      {signUpFailed
                        ? (<Form.Control.Feedback type="invalid" tooltip>{t('card.form.errors.signUpFail')}</Form.Control.Feedback>)
                        : null}
                    </div>
                    <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('card.form.submitBtn')}</Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
