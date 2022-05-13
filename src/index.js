import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import '../assets/application.scss';
import init from './init.jsx';

const runApp = () => {
  const socket = io();
  const test = init(socket);
  ReactDOM.createRoot(document.getElementById('chat')).render(test);

  // return test;
};

runApp();
