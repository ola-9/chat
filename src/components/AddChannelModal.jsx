import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const AddChannelModal = ({
  show, setShow, socket, setCurrChannelId,
}) => {
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      // console.log('values !!!!', values);
      handleClose();
      socket.emit('newChannel', values, (data) => {
        console.log(data); // confirm if Ok
      }); // send msg to socket server
      formik.resetForm();
    },
  });

  useEffect(() => {
    // inputRef.current.focus();
    socket.on('newChannel', (channel) => {
      // console.log('!!!!!!!!!', channel.id);
      setCurrChannelId(channel.id);
      dispatch(channelsActions.addChannel(channel));
    });
  }, [socket]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              id="name"
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Отправить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
