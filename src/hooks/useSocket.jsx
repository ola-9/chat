import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';

const useSocket = () => useContext(SocketContext);

export default useSocket;
