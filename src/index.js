// import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import '../assets/application.scss';
import init from './init.jsx';

const root = ReactDOM.createRoot(document.getElementById('chat'));

const runApp = () => {
  const socket = io();
  const test = init(socket);
  // const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    test,
  );

  // return test;
};

runApp();
