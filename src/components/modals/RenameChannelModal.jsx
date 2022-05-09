import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n.js';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { getChannelSchema } from '../../yupSchema.js';

const RenameChannelModal = (props) => {
  const { onHide, modalInfo, socket } = props;
  const { channel } = modalInfo;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const dispatch = useDispatch();

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const channelNames = channels.map((item) => item.name);
  console.log('channelNames: ', channelNames);

  const [inputValid, setInputValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  const schema = getChannelSchema(channelNames);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: (values) => {
      // socket.emit('renameChannel', { id: channel.id, name: values.name }, (data) => {
      //   console.log(data);
      // });
      // socket.on('renameChannel', () => {
      //   dispatch(channelsActions.updateChannel({
      //     id: channel.id,
      //     changes: { ...modalInfo, name: formik.values.name },
      //   }));
      // });
      // onHide();
      const validate = async (input) => {
        try {
          await schema.validate(input);
          socket.emit('renameChannel', { id: channel.id, name: values.name }, (data) => {
            console.log(data);
          });
          socket.on('renameChannel', () => {
            dispatch(channelsActions.updateChannel({
              id: channel.id,
              changes: { ...modalInfo, name: formik.values.name },
            }));
          });
          onHide();
        } catch (err) {
          const [message] = err.errors.map((error) => i18n.t(error.key));
          // console.log('error messages: ', message);
          setInputValid(false);
          setValidationError(message);
        }
      };
      validate(values);
    },
  });

  const { t } = useTranslation('translation', { keyPrefix: 'chat.modals.rename' });

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
            {validationError ? <div className="text-danger">{t(validationError)}</div> : null}
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
