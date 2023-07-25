import express from 'express';
import { logout } from '../controllers/users.js';

const router = express.Router();

router.post('/', logout);

export { router as signout };
