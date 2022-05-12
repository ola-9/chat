import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RProvider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';

import i18n from './i18n.js';
import '../assets/application.scss';
import App from './components/App.jsx';
import store from './slices/index.js';

const rollbarConfig = {
  accessToken: 'cbc76f9cbb72450bbc155fc59816ed3c',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const rollbar = new Rollbar(rollbarConfig);

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RProvider config={rollbarConfig} instance={rollbar}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </RProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
);
