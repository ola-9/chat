import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatApiProvider.jsx';

const useChatApi = () => useContext(ChatContext);

export default useChatApi;
