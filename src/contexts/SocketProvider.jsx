import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as currChannelActions } from '../slices/uiSlice.js';

export const SocketContext = createContext({});

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (data) => {
    if (data.status === 'ok') {
      dispatch(currChannelActions.setCurrChannelId(data.data.id));
    }
  });

  socket.on('newChannel', (newChannel) => {
    dispatch(channelsActions.addChannel(newChannel));
  });

  const createNewChatMessage = (message) => socket.emit('newMessage', message, (data) => {
    console.log(data);
  });

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  const renameChannel = (channel, input) => socket.emit(
    'renameChannel',
    { id: channel.id, name: input.name },
    (data) => {
      console.log(data);
    },
  );

  socket.on('renameChannel', (renamedChannel) => {
    dispatch(channelsActions.updateChannel({
      id: renamedChannel.id,
      changes: { ...renamedChannel, name: renamedChannel.name },
    }));
  });

  const removeChannel = (channel) => socket.emit(
    'removeChannel',
    { id: channel.id },
    (data) => {
      console.log(data);
    },
  );

  socket.on('removeChannel', (removedChannel) => {
    dispatch(channelsActions.removeChannel(removedChannel.id));
  });

  return (
    <SocketContext.Provider value={{
      addNewChannel, createNewChatMessage, renameChannel, removeChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
