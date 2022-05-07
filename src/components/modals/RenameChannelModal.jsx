import { useFormik } from 'formik';
import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Modal, FormGroup, FormControl, FormLabel,
} from 'react-bootstrap';
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

  return (
    <Modal
      show
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormLabel
              htmlFor="name"
              className="visually-hidden"
            >
              Имя канала
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
              <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
              <Button type="submit" variant="primary">Отправить</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
