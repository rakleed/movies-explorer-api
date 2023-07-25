import 'dotenv/config';

const {
  NODE_ENV,
} = process.env;
let {
  PORT, DATABASE_URL, JWT_SECRET,
} = process.env;

// site port
PORT = NODE_ENV === 'production' ? PORT : 3000;

// MongoDB
DATABASE_URL = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';
JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

// regexes
const REGEX_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const REGEX_ID = /[a-z0-9]{24}/;

// errors
const BAD_REQUEST_STATUS = 400;
const BAD_REQUEST_MESSAGE_USERS_CREATE = 'Переданы некорректные данные при создании пользователя.';
const BAD_REQUEST_MESSAGE_USERS_GET = 'Переданы некорректные данные при поиске пользователя.';
const BAD_REQUEST_MESSAGE_USERS_UPDATE = 'Переданы некорректные данные при обновлении пользователя.';
const BAD_REQUEST_MESSAGE_MOVIES_CREATE = 'Переданы некорректные данные при создании фильма.';
const BAD_REQUEST_MESSAGE_MOVIES_DELETE = 'Передан несуществующий `_id` фильма.';

const UNAUTHORIZED_STATUS = 401;
const UNAUTHORIZED_MESSAGE_AUTH = 'Необходима авторизация.';
const UNAUTHORIZED_MESSAGE_USER = 'Неправильные эл. почта или пароль.';

const FORBIDDEN_STATUS = 403;
const FORBIDDEN_MESSAGE_MOVIES = 'Отсутствуют права для удаления фильма с указанным `_id`.';

const NOT_FOUND_STATUS = 404;
const NOT_FOUND_MESSAGE_USERS = 'Пользователь по указанному `_id` не найден.';
const NOT_FOUND_MESSAGE_MOVIES = 'Фильм с указанным `_id` не найден.';
const NOT_FOUND_MESSAGE_NOTFOUNDPAGE = 'Такая страница не существует.';

const CONFLICT_STATUS = 409;
const CONFLICT_MESSAGE_USERS_CREATE = 'Пользователь с такой эл. почтой уже зарегистрирован.';
const CONFLICT_MESSAGE_USERS_UPDATE = 'Есть другой пользователь с такой эл. почтой.';

const INTERNAL_SERVER_ERROR_STATUS = 500;
const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';

// response messages
const RESPONSE_MESSAGE_MOVIES_DELETE = 'Фильм с указанным `_id` удалён.';
const RESPONSE_MESSAGE_LOGOUT = 'Выполнен выход из аккаунта.';

export {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  REGEX_URL,
  REGEX_ID,
  BAD_REQUEST_STATUS,
  BAD_REQUEST_MESSAGE_USERS_CREATE,
  BAD_REQUEST_MESSAGE_USERS_GET,
  BAD_REQUEST_MESSAGE_USERS_UPDATE,
  BAD_REQUEST_MESSAGE_MOVIES_CREATE,
  BAD_REQUEST_MESSAGE_MOVIES_DELETE,
  UNAUTHORIZED_STATUS,
  UNAUTHORIZED_MESSAGE_AUTH,
  UNAUTHORIZED_MESSAGE_USER,
  FORBIDDEN_STATUS,
  FORBIDDEN_MESSAGE_MOVIES,
  NOT_FOUND_STATUS,
  NOT_FOUND_MESSAGE_USERS,
  NOT_FOUND_MESSAGE_MOVIES,
  NOT_FOUND_MESSAGE_NOTFOUNDPAGE,
  CONFLICT_STATUS,
  CONFLICT_MESSAGE_USERS_CREATE,
  CONFLICT_MESSAGE_USERS_UPDATE,
  INTERNAL_SERVER_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_MESSAGE,
  RESPONSE_MESSAGE_MOVIES_DELETE,
  RESPONSE_MESSAGE_LOGOUT,
};
