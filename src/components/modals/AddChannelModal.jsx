import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Button, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useChatApi from '../../hooks/useChat.jsx';
import toastParams from '../../toastParams.js';

const AddChannelModal = ({ onHide }) => {
  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const channelsNames = channels.map((channel) => channel.name);

  const [inputValid, setInputValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  const inputRef = useRef();

  const { t } = useTranslation('translation', { keyPrefix: 'chat.modals.add' });

  const { addNewChannel } = useChatApi();

  const schema = yup.object({
    name: yup
      .string()
      .required(t('errors.required'))
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax'))
      .notOneOf(channelsNames, t('errors.notUnique')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    onSubmit: async (values) => {
      try {
        await schema.validate(values);
        addNewChannel(values);
        formik.resetForm();
        onHide();
        toast.success(t('toast'), toastParams);
      } catch (err) {
        const [message] = err.errors;
        setInputValid(false);
        setValidationError(message);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal
      show
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormLabel
              htmlFor="name"
              className="visually-hidden"
            >
              {t('inputLabel')}
            </FormLabel>
            <FormControl
              className={inputValid ? 'mb-2' : 'mb-2 is-invalid'}
              // required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              id="name"
            />
            {validationError ? <div className="text-danger">{validationError}</div> : null}
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={onHide}>{t('cancelBtn')}</Button>
            <Button type="submit" variant="primary">{t('submitBtn')}</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
