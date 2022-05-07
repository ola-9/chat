import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, Button, FormGroup, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const AddChannelModal = (props) => {
  // console.log(props);
  const { onHide, socket, setCurrChannelId } = props;
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      socket.emit('newChannel', values, (data) => {
        console.log(data); // confirm if Ok
      });
      socket.on('newChannel', (channel) => {
        setCurrChannelId(channel.id);
        dispatch(channelsActions.addChannel(channel));
      });
      formik.resetForm();
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
        <Modal.Title id="contained-modal-title-vcenter">Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              className="mb-3"
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
            />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
