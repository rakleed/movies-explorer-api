import express from 'express';
import { login } from '../controllers/users.js';
import { validateLogin } from '../middlewares/validation.js';

const router = express.Router();

router.post('/', validateLogin, login);

export { router as signin };
