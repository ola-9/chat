import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
// import i18n from '../../i18n.js';
import { toast } from 'react-toastify';
import * as yup from 'yup';
// import { getChannelSchema } from '../../yupSchema.js';

const RenameChannelModal = (props) => {
  const { onHide, modalInfo, socket } = props;
  const { channel } = modalInfo;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const channelsNames = channels.map((item) => item.name);
  // console.log('channelsNames: ', channelsNames);

  const [inputValid, setInputValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'chat.modals.rename' });

  const schema = yup.object({
    name: yup
      .string()
      .required(t('required'))
      .min(3, t('minMax'))
      .max(20, t('minMax'))
      .notOneOf(channelsNames, t('notUnique')),
  });

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: (values) => {
      const validate = async (input) => {
        try {
          await schema.validate(input);
          socket.emit('renameChannel', { id: channel.id, name: values.name }, (data) => {
            console.log(data);
          });
          onHide();
          toast.success('Канал переименован', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } catch (err) {
          const [message] = err.errors;
          setInputValid(false);
          setValidationError(message);
        }
      };
      validate(values);
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
