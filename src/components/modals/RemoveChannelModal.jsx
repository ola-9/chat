import React from 'react';
// import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RemoveChannelModal = (props) => {
  const { onHide, modalInfo, socket } = props;
  const { channel } = modalInfo;

  const handleRemove = () => {
    // console.log('remove channel');
    socket.emit('removeChannel', { id: channel.id }, (data) => {
      console.log(data);
    });
    onHide();
    toast.success('Канал удален', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const { t } = useTranslation('translation', { keyPrefix: 'chat.modals.remove' });

  return (
    <Modal
      show
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {(t('title'))}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('body')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>{t('cancelBtn')}</Button>
          <Button variant="danger" onClick={handleRemove}>{(t('removeBtn'))}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
