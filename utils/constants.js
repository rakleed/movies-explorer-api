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
const UNAUTHORIZED_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const NOT_FOUND_STATUS = 404;
const CONFLICT_STATUS = 409;
const INTERNAL_SERVER_ERROR_STATUS = 500;
const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';

export {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  REGEX_URL,
  REGEX_ID,
  BAD_REQUEST_STATUS,
  UNAUTHORIZED_STATUS,
  FORBIDDEN_STATUS,
  NOT_FOUND_STATUS,
  CONFLICT_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_MESSAGE,
};
