import jwt from 'jsonwebtoken';
import { Unauthorized } from '../errors/Unauthorized.js';
import {
  JWT_SECRET,
  UNAUTHORIZED_MESSAGE_AUTH,
} from '../utils/constants.js';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(UNAUTHORIZED_MESSAGE_AUTH);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized(UNAUTHORIZED_MESSAGE_AUTH));
  }

  req.user = payload;
  next();
};

export { auth };
