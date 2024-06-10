import {Router} from 'express';
import { createDebt, getDebtsByUserId, getDebtById, updateDebt, deleteDebt } from '../controllers/debtController.js';
import authMiddleware from '../middlewares/authMiddleware.jsw';
const router = Router();

router.post('/', authMiddleware, createDebt);
router.get('/', authMiddleware, getDebtsByUserId);
router.get('/:id', authMiddleware, getDebtById);
router.put('/:id', authMiddleware, updateDebt);
router.delete('/:id', authMiddleware, deleteDebt);

export default router;