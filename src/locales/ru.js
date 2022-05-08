export default {
  translation: {
    header: {
      brand: 'Hexlet Chat',
      logoutBtn: 'Выйти',
    },
    chat: {
      channels: {
        header: 'Каналы',
        renameBtn: 'Переименовать',
        removeBtn: 'Удалить',
        manageChannelBtn: 'Управление каналом',
      },
      messages: {
        sendMessageBtn: 'Отправить',
        inputPlaceholder: 'Введите сообщение...',
        сounter: {
          count_one: '{{count}} сообщение',
          count_few: '{{count}} сообщения',
          count_many: '{{count}} сообщений',
        },
      },
      modals: {
        add: {
          title: 'Добавить канал',
          cancelBtn: 'Отменить',
          submitBtn: 'Отправить',
          errors: {
            notUnique: 'Должно быть уникальным',
            required: 'Обязательное поле',
            minMax: 'От 3 до 20 символов',
          },
        },
        rename: {
          title: 'Переименовать канал',
          inputLabel: 'Имя канала',
          cancelBtn: 'Отменить',
          submitBtn: 'Отправить',
        },
        remove: {
          title: 'Удалить канал',
          body: 'Уверены?',
          cancelBtn: 'Отменить',
          removeBtn: 'Удалить',
        },
      },
    },
    login: {
      card: {
        img: {
          alt: 'Войти',
        },
        form: {
          header: 'Войти',
          username: {
            placeholder: 'Ваш ник',
            label: 'Ваш ник',
          },
          password: {
            placeholder: 'Пароль',
            label: 'Пароль',
          },
          submitBtn: 'Войти',
          errors: {
            auth: 'Неверные имя пользователя или пароль',
            validation: 'необходимо ввести логин',
          },
        },
        footer: {
          question: 'Нет аккаунта?',
          signup: 'Регистрация',
        },
      },
    },
  },
};
