import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes.js';
import Channel from './Channel.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import useAuth from '../hooks/index.jsx';

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
      {/* <Navigation /> */}
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col xs={4} md="2" className="border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>Каналы</span>
              <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
              {channels.map((channel) => (
                <Channel key={channel.id} channel={channel} currChannelId={currChannelId} />
              ))}
            </ul>
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># general</b>
                </p>
                <span className="text-muted">188 сообщений</span>
              </div>
              <div className="chat-messages overflow-auto px-5 " id="messages-box">
                <div className="text-break mb-2">
                  <b>User 1</b>
                  :
                  тестовое сообщение
                </div>
              </div>
              <div className="chat-messages overflow-auto px-5 " id="messages-box">
                <div className="text-break mb-2">
                  <b>User 2</b>
                  :
                  еще одно тестовое сообщение
                </div>
              </div>
              <div className="mt-auto px-5 py-3">
                <form className="py-1 border rounded-2">
                  <div className="input-group has-validation">
                    <input
                      className="border-0 p-0 ps-2 form-control"
                      placeholder="Введите сообщение..."
                    />
                    <button type="submit" className="btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default Chat;
