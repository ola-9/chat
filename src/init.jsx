import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RProvider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';
import { Provider } from 'react-redux';
import filter from 'leo-profanity';
import resources from './locales/index.js';
import store from './slices/index.js';
import App from './components/App.jsx';

const init = (socket) => {
  const defaultLanguage = 'ru';

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLanguage,
      // fallbackLng: 'ru',
      // debug: true,

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });

  // Настройка фильтрации
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const rollbarConfig = {
    accessToken: 'cbc76f9cbb72450bbc155fc59816ed3c',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const rollbar = new Rollbar(rollbarConfig);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <RProvider config={rollbarConfig} instance={rollbar}>
            <ErrorBoundary>
              <App socket={socket} />
            </ErrorBoundary>
          </RProvider>
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default init;
