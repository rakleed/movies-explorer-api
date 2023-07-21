require('dotenv').config();

const {
  NODE_ENV, PORT, DATABASE_URL, JWT_SECRET,
} = process.env;

// site port
module.exports.PORT = NODE_ENV === 'production' ? PORT : 3000;

// MongoDB
module.exports.DATABASE_URL = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';
module.exports.SECRET_PASSWORD_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

// regexes
module.exports.REGEX_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
module.exports.REGEX_ID = /[a-z0-9]{24}/;

// errors
module.exports.BAD_REQUEST_STATUS = 400;
module.exports.UNAUTHORIZED_STATUS = 401;
module.exports.FORBIDDEN_STATUS = 403;
module.exports.NOT_FOUND_STATUS = 404;
module.exports.INTERNAL_SERVER_ERROR_STATUS = 500;
module.exports.INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка.';
