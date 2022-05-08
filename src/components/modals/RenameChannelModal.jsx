import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const RenameChannelModal = (props) => {
  const { onHide, modalInfo, socket } = props;
  const { channel } = modalInfo;
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: (values) => {
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
              className="mb-2"
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
            />
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
