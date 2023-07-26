import express from 'express';
import {
  getMovies, createMovie, deleteMovie,
} from '../controllers/movies.js';
import {
  validateCreateMovie, validateDeleteMovie,
} from '../middlewares/validation.js';

const router = express.Router();

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

export { router as movies };
