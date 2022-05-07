import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';

const ChatButton = ({
  channel, currChannelId, setCurrChannelId, showModal,
}) => {
  const { id, name, removable } = channel;
  const variant = id === currChannelId ? 'secondary' : '';
  const handleClick = (id === currChannelId) ? null : () => setCurrChannelId(id);

  return (
    removable
      ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            variant={variant}
            className="w-100 rounded-0 text-start"
            onClick={handleClick}
          >
            <span className="me-1">#</span>
            {name}
          </Button>
          <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className="flex-grow-0">
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('removing', channel)}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming', channel)}>Переименовать</Dropdown.Item>
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
