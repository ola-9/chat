import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Button, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
// import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { getChannelSchema } from '../../yupSchema.js';

const AddChannelModal = (props) => {
  const {
    onHide, socket, setCurrChannelId,
  } = props;

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const channelNames = channels.map((channel) => channel.name);

  const [inputValid, setInputValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  const inputRef = useRef();

  const schema = getChannelSchema(channelNames);

  // const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
    },

    onSubmit: (values) => {
      const validate = async (input) => {
        try {
          await schema.validate(input);
          socket.emit('newChannel', values, (data) => {
            console.log(data); // confirm if Ok
          });
          formik.resetForm();
          onHide();
          toast.success('Канал создан', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } catch (err) {
          // const [message] = err.errors.map((error) => i18n.t(error.key));
          const [message] = err.errors;
          // console.log('error messages: ', err.errors);
          setInputValid(false);
          setValidationError(message);
        }
      };
      validate(values);
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    socket.on('newChannel', (channel) => {
      setCurrChannelId(channel.id);
      // dispatch(channelsActions.addChannel(channel));
    });
  }, [socket]);

  const { t } = useTranslation('translation', { keyPrefix: 'chat.modals.add' });

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
