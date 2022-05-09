import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DataFetchErrorModal = ({ setDataFetchError }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'errorModal' });

  return (
    <Modal
      show
      onHide={() => setDataFetchError(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {t('title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {t('body')}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default DataFetchErrorModal;
