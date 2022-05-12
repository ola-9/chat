import React, { useEffect } from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const ChatButton = ({
  socket, channel, currChannelId, setCurrChannelId, showModal,
}) => {
  const { id, name, removable } = channel; // name.length=9
  // const chatName = name.length <= 6 ? name : `${name.slice(0, 6)} ...`;
  const variant = id === currChannelId ? 'secondary' : '';
  const handleClick = (id === currChannelId) ? null : () => setCurrChannelId(id);
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chat.channels' });

  useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      // setCurrChannelId(newChannel.id);
      dispatch(channelsActions.addChannel(newChannel));
    });
    socket.on('removeChannel', (removedChannel) => {
      // console.log('removedChannel.id: ', removedChannel.id);
      // console.log('currChannelId: ', currChannelId);
      // const channelIdToBe = currChannelId === removedChannel.id ? 1 : currChannelId;
      // setCurrChannelId(channelIdToBe);
      setCurrChannelId(1);
      dispatch(channelsActions.removeChannel(removedChannel.id));
    });
    socket.on('renameChannel', (renamedChannel) => {
      dispatch(channelsActions.updateChannel({
        id: renamedChannel.id,
        changes: { ...renamedChannel, name: renamedChannel.name },
      }));
    });
  }, [socket]);

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
            {/* {chatName} */}
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
          onClick={handleClick}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      )
  );
};

export default ChatButton;
