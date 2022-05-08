import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChatButton = ({
  channel, currChannelId, setCurrChannelId, showModal,
}) => {
  const { id, name, removable } = channel; // name.length=9
  const chatName = name.length <= 6 ? name : `${name.slice(0, 6)} ...`;
  const variant = id === currChannelId ? 'secondary' : '';
  const handleClick = (id === currChannelId) ? null : () => setCurrChannelId(id);

  const { t } = useTranslation('translation', { keyPrefix: 'chat.channels' });

  return (
    removable
      ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={variant}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleClick}
          >
            <span className="me-1">#</span>
            {chatName}
          </Button>
          <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className="flex-grow-0">
            <span className="visually-hidden">{t('manageChannelBtn')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('removeBtn')}</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', channel)}>{t('renameBtn')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
      : (
        <Button
          variant={variant}
          className="w-100 rounded-0 text-start"
          onClick={handleClick}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      )
  );
};

export default ChatButton;
