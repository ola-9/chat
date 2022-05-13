import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import ChatButton from './ChatButton.jsx';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import NewChatMessage from './NewChatMesage.jsx';
import ChatMessage from './ChatMessage.jsx';
import getModal from './modals/index.jsx';
// import DataFetchErrorModal from './DataFetchErrorModal.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const renderModal = ({
  modalInfo, hideModal, setCurrChannelId, socket,
}) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);

  return (
    <Component
      modalInfo={modalInfo}
      setCurrChannelId={setCurrChannelId}
      socket={socket}
      onHide={hideModal}
    />
  );
};

const Chat = ({ socket }) => {
  const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const [currChannelId, setCurrChannelId] = useState(null);
  const [currUser, setCurrUser] = useState('');

  // const [dataFetchError, setDataFetchError] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        const { channels, currentChannelId, messages } = data;
        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
        setCurrUser(username);
        setCurrChannelId(currentChannelId);
      } catch (err) {
        // setDataFetchError(true);
        // console.log('err: ', err);
        toast.warn('Возникла ошибка с загрузкой данных. Обновите старинцу.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchContent();
  }, []);

  const channels = useSelector((state) => Object.values(state.channelsReducer.entities));
  const currChannel = channels.find((channel) => channel.id === currChannelId) ?? '';

  const messages = useSelector((state) => Object.values(state.messagesReducer.entities));
  const currChannelMessages = messages.filter((message) => message.channelId === currChannelId);

  const [modalInfo, setModalInfo] = useState({ type: null, channel: null });
  const hideModal = () => setModalInfo({ type: null, channel: null });
  const showModal = (type, channel = null) => setModalInfo({ type, channel });

  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  return (
    <div className="d-flex flex-column h-100">
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
                    socket={socket}
                    channel={channel}
                    currChannelId={currChannelId}
                    setCurrChannelId={setCurrChannelId}
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
                    {currChannel.name}
                  </b>
                </p>
                <span className="text-muted">
                  {t('messages.сounter.count', { count: currChannelMessages.length })}
                </span>
              </div>
              {currChannelMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              <NewChatMessage socket={socket} currChannelId={currChannelId} username={currUser} />
            </div>
          </Col>
        </Row>
      </Container>
      {renderModal({
        modalInfo, hideModal, setCurrChannelId, socket,
      })}
      {/* {dataFetchError
        ? <DataFetchErrorModal setDataFetchError={setDataFetchError} />
        : null} */}
    </div>
  );
};

export default Chat;
