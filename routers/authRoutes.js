import {Router} from 'express';
import { register, verifyOtp, login } from '../controllers/authController.js';
const router = Router();

router.post('/register', register);
router.post('/verify', verifyOtp);
router.post('/login', login);

export default router;