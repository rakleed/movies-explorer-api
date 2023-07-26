import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { BadRequest } from '../errors/BadRequest.js';
import { NotFound } from '../errors/NotFound.js';
import { Conflict } from '../errors/Conflict.js';
import {
  JWT_SECRET,
  BAD_REQUEST_MESSAGE_USERS_CREATE,
  BAD_REQUEST_MESSAGE_USERS_GET,
  BAD_REQUEST_MESSAGE_USERS_UPDATE,
  NOT_FOUND_MESSAGE_USERS,
  CONFLICT_MESSAGE_USERS_CREATE,
  CONFLICT_MESSAGE_USERS_UPDATE,
  RESPONSE_MESSAGE_LOGOUT,
} from '../utils/constants.js';

const { Error } = mongoose;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest(BAD_REQUEST_MESSAGE_USERS_CREATE));
      }
      if (err.code === 11000) {
        next(new Conflict(CONFLICT_MESSAGE_USERS_CREATE));
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(NOT_FOUND_MESSAGE_USERS))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequest(BAD_REQUEST_MESSAGE_USERS_GET));
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .orFail(new NotFound(NOT_FOUND_MESSAGE_USERS))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest(BAD_REQUEST_MESSAGE_USERS_UPDATE));
      }
      if (err.code === 11000) {
        next(new Conflict(CONFLICT_MESSAGE_USERS_UPDATE));
      }
      next(err);
    });
};

const logout = (req, res) => {
  res.clearCookie('token').send({ message: RESPONSE_MESSAGE_LOGOUT });
};

export {
  login,
  createUser,
  getCurrentUser,
  updateUserInfo,
  logout,
};
