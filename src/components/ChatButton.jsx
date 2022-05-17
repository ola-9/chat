import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ChatButton = ({
  channel, showModal, handleClick,
}) => {
  const { id, name, removable } = channel;
  const [currChannel] = useSelector((state) => Object.values(state.currChannelReducer.entities));
  const variant = id === currChannel.id ? 'secondary' : '';

  const { t } = useTranslation('translation', { keyPrefix: 'chat.channels' });

  return (
    removable
      ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={variant}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => handleClick(channel)}
          >
            <span className="me-1">#</span>
            {name}
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
          onClick={() => handleClick(channel)}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      )
  );
};

export default ChatButton;
