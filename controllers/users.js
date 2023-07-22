import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { BadRequest } from '../errors/BadRequest.js';
import { NotFound } from '../errors/NotFound.js';
import { Conflict } from '../errors/Conflict.js';
import { JWT_SECRET } from '../utils/constants.js';

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
        next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
      }
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегистрирован.'));
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Пользователь по указанному `_id` не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequest('Переданы некорректные данные при поиске пользователя.'));
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(new NotFound('Пользователь по указанному `_id` не найден.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении пользователя.'));
      }
      next(err);
    });
};

export {
  login, createUser, getCurrentUser, updateUserInfo,
};
