import express from 'express';
import { signin } from './signin.js';
import { signup } from './signup.js';
import { auth } from '../middlewares/auth.js';
import { users } from './users.js';
import { movies } from './movies.js';
import { notFoundPage } from './notFoundPage.js';

const router = express.Router();

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

router.use('*', notFoundPage);

export { router as index };
