import express from 'express';
import { createUser } from '../controllers/users.js';
import { validateCreateUser } from '../middlewares/validation.js';

const router = express.Router();

router.post('/', validateCreateUser, createUser);

export { router as signup };
