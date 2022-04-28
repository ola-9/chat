import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/scss/bootstrap.scss';
import App from './components/App.jsx';
import store from './slices/index.js';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
