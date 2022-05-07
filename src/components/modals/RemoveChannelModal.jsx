import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const RemoveChannelModal = (props) => {
  const { onHide, modalInfo, socket } = props;
  const { channel } = modalInfo;
  const dispatch = useDispatch();

  const handleRemove = () => {
    console.log('remove channel');
    socket.emit('removeChannel', { id: channel.id }, (data) => {
      console.log(data);
    });
    socket.on('removeChannel', () => {
      dispatch(channelsActions.removeChannel(channel.id));
    });
    onHide();
  };

  return (
    <Modal
      show
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>Отменить</Button>
          <Button variant="danger" onClick={handleRemove}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
