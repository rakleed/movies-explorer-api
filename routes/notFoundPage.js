import express from 'express';
import { NotFound } from '../errors/NotFound.js';

const router = express.Router();

router.use('/', (req, res, next) => next(new NotFound('Такая страница не существует.')));

export { router as notFoundPage };
