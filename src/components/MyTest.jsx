/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Field, Form, Formik, ErrorMessage,
} from 'formik';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(6),
});

const onSubmit = (values) => {
  console.log('form data: ', values);
};

function MyTest() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="col-12 col-md-6 mt-3 mt-mb-0">
        <div className="form-floating mb-3">
          <label htmlFor="username">Username</label>
          <Field
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Ваш ник"
          />
          <ErrorMessage name="username" />
        </div>
        <div className="form-floating mb-4">
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Пароль"
          />
          <ErrorMessage name="password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default MyTest;
