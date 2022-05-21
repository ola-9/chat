import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import toastParams from '../../toastParams.js';
import useChatApi from '../../hooks/useChat.jsx';

const RemoveChannelModal = ({ onHide, modalInfo }) => {
  const { channel } = modalInfo;
  const { t } = useTranslation('translation', { keyPrefix: 'chat.modals.remove' });
  const { removeChannel } = useChatApi();
  const handleRemove = () => {
    removeChannel(channel);
    onHide();
    toast.success(t('toast'), toastParams);
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
