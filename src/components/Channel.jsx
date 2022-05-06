import React from 'react';
import cn from 'classnames';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

const Channel = ({ channel, currChannelId, onChannelClick }) => {
  const { id, name, removable } = channel;

  const btnClass = cn('w-100 rounded-0 text-start btn', {
    'btn-secondary': id === currChannelId,
  });

  const renameModalHandler = () => {
    console.log('rename channel');
  };

  const removeModalHandler = () => {
    console.log('remove modal handler');
  };

  return (
    removable
      ? (
        <Dropdown as={ButtonGroup}>
          <button
            type="button"
            className={btnClass}
            onClick={() => onChannelClick(id)}
          >
            <span className="me-1">#</span>
            {name}
          </button>

          <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={removeModalHandler}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={renameModalHandler}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
      : (
        <li className="nav-item w-100">
          <button
            type="button"
            className={btnClass}
            onClick={() => onChannelClick(id)}
          >
            <span className="me-1">#</span>
            {name}
          </button>
        </li>
      )
  );
};

export default Channel;
