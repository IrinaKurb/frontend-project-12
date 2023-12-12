export default {
    ru: {
        translation: {
            notFoundPage: 'Страница не найдена',
            networkError: 'Ошибка сoeдинения',
            unknownError: 'Неизвестная ошибка',
            singUpPage: {
                requiredField: 'Oбязательное поле!',
                username: 'Ваш ник',
                password: 'Пароль',
                login: 'Войти',
                wrongCredentials: 'Неверные имя пользователя или пароль',
                noAccountQuestion: 'Нет аккаунта? ',
                signup: 'Регистрация',
            },
            chatPage: {
                channels: "Каналы",
                messages_one: "{{count}} сообщение",
                messages_few: "{{count}} сообщения",
                messages_many: "{{count}} сообщений",
                inputMessage: "Введите сообщение...",
                ariaLabelMsg: "Новое сообщение",
                exit: "Выйти",
                chatName: "Hexlet Chat",
                delete: "Удалить",
                rename: "Переименовать",
                messagesForUser: {
                    connected: "Связь с сервером установлена",
                    disconnected: "Связь с сервером потеряна",
                    messageNotSend: 'Сообщение не отправлено!',
                },
            },
            registrationPage: {
                title: 'Регистрация',
                userName: 'Имя пользователя',
                password: 'Пароль',
                confPassword: 'Подтвердите пароль',
                regisration: 'Зарегистрироваться',
                errors: {
                    samePassword: 'Пароли должны совпадать',
                    sameUser: 'Такой пользователь уже существует',
                    minPasswordLength: 'Не менее 6 символов',
                    maxLength: 'От 3 до 20 символов',
                    minLength: 'От 3 до 20 символов',
                    required: 'Обязательное поле',
                },
            },
            channelsInf: { 
                channelName: 'Имя канала',
                handleChannel: 'Управление каналом',
                addChannel: 'Добавить канал',
            },
            modalWindow: {
                reset: 'Отменить',
                send: 'Отправить',
                channelCreated: 'Канал создан',
                removeChannel: 'Удалить канал',
                conformation: 'Уверены?',
                delete: 'Удалить',
                channelRemoved: 'Канал удалён',
                renameChannel: 'Переименовать канал',
                channelRenamed: 'Канал переименован',
                errors: {
                    uniq: 'Должно быть уникальным',
                    maxLength: 'От 3 до 20 символов',
                    minLength: 'От 3 до 20 символов',
                    required: 'Обязательное поле',
                }
            }
        },
    }
}