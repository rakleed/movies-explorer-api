const { Error } = require('mongoose');
const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
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

module.exports.deleteMovie = (req, res, next) => {
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
