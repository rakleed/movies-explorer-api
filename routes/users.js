import express from 'express';
import {
  getCurrentUser,
  updateUserInfo,
} from '../controllers/users.js';
import {
  validateUpdateUserInfo,
} from '../middlewares/validation.js';

const router = express.Router();

router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUserInfo, updateUserInfo);

export { router as users };
