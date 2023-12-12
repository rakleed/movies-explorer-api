import { celebrate, Joi } from 'celebrate';
import { REGEX_URL, REGEX_ID } from '../utils/constants.js';

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEX_URL),
    trailerLink: Joi.string().required().regex(REGEX_URL),
    thumbnail: Joi.string().required().regex(REGEX_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().regex(REGEX_ID),
  }),
});

export {
  validateLogin,
  validateCreateUser,
  validateUpdateUserInfo,
  validateCreateMovie,
  validateDeleteMovie,
};
