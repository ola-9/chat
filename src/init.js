import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
// import { Provider } from '@rollbar/react';
import Rollbar from 'rollbar';
import resources from './locales/index.js';
import store from './slices/index.js';
// import App from './components/App.jsx';

export default () => {
  // 1) создание сокета
  const socket = io();

  // 2) создание экземпляра i18next
  const defaultLanguage = 'ru';
  const i18nIntance = i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLanguage,
      fallbackLng: 'ru',
      debug: true,

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });

  // Rollbar
  const rollbarConfig = {
    accessToken: 'cbc76f9cbb72450bbc155fc59816ed3c',
    environment: 'production',
  };

  const rollbar = new Rollbar(rollbarConfig);

  return {
    store,
    socket,
    i18nIntance,
    rollbar,
  };
  // Что пункты ниже значат в контексте проекта:
  // 3) Загрузка и запуск фреймворка, если он есть
  // 4) Настройка различных библиотек: http-клиенты, работа с датами и так далее
};
