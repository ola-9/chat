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
        inputLabel: 'Новое сообщение',
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
          inputLabel: 'Имя канала',
          errors: {
            notUnique: 'Должно быть уникальным',
            required: 'Обязательное поле',
            minMax: 'От 3 до 20 символов',
          },
          toast: 'Канал создан',
        },
        rename: {
          title: 'Переименовать канал',
          inputLabel: 'Имя канала',
          cancelBtn: 'Отменить',
          submitBtn: 'Отправить',
          errors: {
            notUnique: 'Должно быть уникальным',
            required: 'Обязательное поле',
            minMax: 'От 3 до 20 символов',
          },
          toast: 'Канал переименован',
        },
        remove: {
          title: 'Удалить канал',
          body: 'Уверены?',
          cancelBtn: 'Отменить',
          removeBtn: 'Удалить',
          toast: 'Канал удалён',
        },
      },
      dataFetchError: 'Возникла ошибка с загрузкой данных. Обновите старинцу.',
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
    errorModal: {
      title: 'Невозможно получить данные',
      body: 'Возникла проблема с загрузкой данных. Закройте это окно и попробуйте обновить страницу',
    },
    signup: {
      card: {
        img: {
          alt: 'Регистрациия',
        },
        form: {
          header: 'Регистрация',
          username: {
            placeholder: 'Имя пользователя',
            label: 'Имя пользователя',
          },
          password: {
            placeholder: 'Пароль',
            label: 'Пароль',
          },
          passwordConfirmation: {
            placeholder: 'Подтвердите пароль',
            label: 'Подтвердите пароль',
          },
          submitBtn: 'Зарегистрироваться',
          errors: {
            min: 'Не менее 6 символов',
            minMax: 'От 3 до 20 символов',
            required: 'Обязательное поле',
            passwordConfirmation: 'Пароли должны совпадать',
            signUpFail: 'Такой пользователь уже существует',
          },
        },
      },
    },
  },
};
