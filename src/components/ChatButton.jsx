import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as currChannelActions } from '../slices/currChannelSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const ChatButton = ({
  socket, channel, showModal, handleClick,
}) => {
  const { id, name, removable } = channel;
  const [currChannel] = useSelector((state) => Object.values(state.currChannelReducer.entities));
  const variant = id === currChannel.id ? 'secondary' : '';
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'chat.channels' });

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (newChannel) => {
    dispatch(channelsActions.addChannel(newChannel));
  });
  socket.on('removeChannel', (removedChannel) => {
    if (removedChannel.id === currChannel.id) {
      dispatch(currChannelActions.updateCurrChannel({
        id: currChannel.id,
        changes: { id: 1, name: 'general', removable: false },
      }));
    }
    dispatch(channelsActions.removeChannel(removedChannel.id));
  });
  socket.on('renameChannel', (renamedChannel) => {
    dispatch(channelsActions.updateChannel({
      id: renamedChannel.id,
      changes: { ...renamedChannel, name: renamedChannel.name },
    }));
  });

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
