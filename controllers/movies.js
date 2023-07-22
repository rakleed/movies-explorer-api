import mongoose from 'mongoose';
import { Movie } from '../models/movie.js';
import { BadRequest } from '../errors/BadRequest.js';
import { Forbidden } from '../errors/Forbidden.js';
import { NotFound } from '../errors/NotFound.js';

const { Error } = mongoose;

const getMovies = (req, res, next) => {
  Movie.find({})
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
        next(new BadRequest('Переданы некорректные данные при создании фильма.'));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate('owner')
    .orFail(new NotFound('Фильм с указанным `_id` не найден.'))
    .then((movie) => {
      if (!movie.owner._id.equals(req.user._id)) {
        throw new Forbidden('Отсутствуют права для удаления фильма с указанным `_id`.');
      }
      Movie.deleteOne(movie)
        .then(res.send('Фильм с указанным `_id` удалён.'));
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        next(new BadRequest('Передан несуществующий `_id` фильма.'));
      }
      next(err);
    });
};

export { getMovies, createMovie, deleteMovie };
