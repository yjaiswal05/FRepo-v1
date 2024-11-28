import express from 'express';
import { UserController } from '../controllers/userController.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', auth, userController.getProfile);
router.put('/me', auth, userController.updateProfile);

export default router; 