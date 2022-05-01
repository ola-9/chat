import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes.js';
import Channel from './Channel.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import useAuth from '../hooks/index.jsx';
import NewMessageInput from './NewMesageInput.jsx';
import ChannelsHeader from './ChannelsHeader.jsx';
import ChatMessage from './ChatMessage.jsx';
import ChannelMessagesHeader from './ChannelMessagesHeader.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const Chat = () => {
  const auth = useAuth();
  console.log('loggedIn inside Chat: ', auth.loggedIn);

  const dispatch = useDispatch();
  const [currChannelId, setCurrChannelId] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      const { channels, currentChannelId } = data;
      dispatch(channelsActions.addChannels(channels));
      setCurrChannelId(currentChannelId);
    };

    fetchContent();
  }, []);

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  // console.log('channels from store: ', channels);

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md="2" className="border-end pt-5 px-0 bg-light">
            <ChannelsHeader />
            <ul className="nav flex-column nav-pills nav-fill px-2">
              {channels.map((channel) => (
                <Channel key={channel.id} channel={channel} currChannelId={currChannelId} />
              ))}
            </ul>
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <ChannelMessagesHeader />
              <ChatMessage />
              <NewMessageInput />
            </div>
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default Chat;
