import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import toastParams from '../../toastParams.js';
import useChatApi from '../../hooks/useChatApi.jsx';

const RenameChannelModal = ({ onHide, modalInfo }) => {
  const { channel } = modalInfo;
  const { renameChannel } = useChatApi();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const channelsNames = channels.map((item) => item.name);

  const [inputValid, setInputValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'chat.modals.rename' });
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
      name: channel.name,
    },
    onSubmit: async (values) => {
      try {
        await schema.validate(values);
        renameChannel(channel, values);
        onHide();
        toast.success(t('toast'), toastParams);
      } catch (err) {
        const [message] = err.errors;
        setInputValid(false);
        setValidationError(message);
      }
    },
  });

  return (
    <Modal
      show
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('title')}</Modal.Title>
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
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
            />
            {validationError ? <div className="text-danger">{validationError}</div> : null}
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="secondary" onClick={onHide}>{t('cancelBtn')}</Button>
              <Button type="submit" variant="primary">{t('submitBtn')}</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
