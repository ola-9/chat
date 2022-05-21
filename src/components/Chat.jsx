import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import ChatButton from './ChatButton.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as uiActions } from '../slices/uiSlice.js';
import NewChatMessage from './NewChatMesage.jsx';
import ChatMessage from './ChatMessage.jsx';
import getModal from './modals/index.jsx';
import useAuth from '../hooks/useAuth.jsx';
import toastParams from '../toastParams.js';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = getModal(modalInfo.type);

  return (
    <Component modalInfo={modalInfo} onHide={hideModal} />
  );
};

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        const { channels, messages, currentChannelId } = data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
        dispatch(uiActions.setCurrChannelId(currentChannelId));
      } catch (err) {
        toast.warn(t('dataFetchError'), toastParams);
      }
    };

    fetchContent();
  }, []);

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const { currentChannelId } = useSelector((state) => state.uiReducer);
  const currChannel = channels.find((channel) => channel.id === currentChannelId);

  const handleClick = (channel) => {
    dispatch(uiActions.setCurrChannelId(channel.id));
  };

  const messages = useSelector((state) => Object.values(state.messagesReducer.entities));
  const currChannelMessages = messages.filter((message) => message.channelId === currentChannelId);

  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const hideModal = () => setModalInfo({ type: null, channel: null });
  const showModal = (type, channel = null) => setModalInfo({ type, channel });

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [currChannelMessages]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md="2" className="border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>
              {t('channels.header')}
            </span>
            <button onClick={() => showModal('adding')} type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((channel) => (
              <li className="nav-item w-100" key={channel.id}>
                <ChatButton
                  channel={channel}
                  handleClick={handleClick}
                  showModal={showModal}
                />
              </li>
            ))}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #&nbsp;
                  {currChannel ? currChannel.name : ''}
                </b>
              </p>
              <span className="text-muted">
                {t('messages.сounter.count', { count: currChannelMessages.length })}
              </span>
            </div>
            <div className="chat-messages overflow-auto px-5 " id="messages-box">
              {currChannelMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <NewChatMessage currChannelId={currChannel ? currChannel.id : ''} username={auth.getUsername()} />
          </div>
        </Col>
      </Row>
      {renderModal({ modalInfo, hideModal })}
    </Container>
  );
};

export default Chat;
