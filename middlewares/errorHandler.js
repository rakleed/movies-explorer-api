import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_STATUS,
} from '../utils/constants.js';

export const errorHandler = (err, req, res, next) => {
  const {
    statusCode = INTERNAL_SERVER_ERROR_STATUS,
    message = INTERNAL_SERVER_ERROR_MESSAGE,
  } = err;
  res.status(statusCode).send({ message });
  next();
};
