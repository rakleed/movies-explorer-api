import mongoose from 'mongoose';
import { Movie } from '../models/movie.js';
import { BadRequest } from '../errors/BadRequest.js';
import { Forbidden } from '../errors/Forbidden.js';
import { NotFound } from '../errors/NotFound.js';
import {
  BAD_REQUEST_MESSAGE_MOVIES_CREATE,
  BAD_REQUEST_MESSAGE_MOVIES_DELETE,
  FORBIDDEN_MESSAGE_MOVIES,
  NOT_FOUND_MESSAGE_MOVIES,
  RESPONSE_MESSAGE_MOVIES_DELETE,
} from '../utils/constants.js';

const { Error } = mongoose;

const getMovies = (req, res, next) => {
  Movie.find({ owner: { _id: req.user._id } })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { ...props } = req.body;

  Movie.create({ ...props, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        next(new BadRequest(BAD_REQUEST_MESSAGE_MOVIES_CREATE));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .orFail(new NotFound(NOT_FOUND_MESSAGE_MOVIES))
    .then((movie) => {
      if (!movie.owner._id.equals(req.user._id)) {
        throw new Forbidden(FORBIDDEN_MESSAGE_MOVIES);
      }
      return Movie.deleteOne(movie)
        .then(res.send(RESPONSE_MESSAGE_MOVIES_DELETE));
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequest(BAD_REQUEST_MESSAGE_MOVIES_DELETE));
      }
      next(err);
    });
};

export { getMovies, createMovie, deleteMovie };
