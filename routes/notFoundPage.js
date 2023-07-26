import express from 'express';
import { NotFound } from '../errors/NotFound.js';
import { NOT_FOUND_MESSAGE_NOTFOUNDPAGE } from '../utils/constants.js';

const router = express.Router();

router.use('/', (req, res, next) => next(new NotFound(NOT_FOUND_MESSAGE_NOTFOUNDPAGE)));

export { router as notFoundPage };
