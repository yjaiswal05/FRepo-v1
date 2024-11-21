import express from 'express';
import { ListController } from '../controllers/listController';
import { auth } from '../middleware/auth';

const router = express.Router();
const listController = new ListController();

router.get('/', auth, listController.getLists);
router.post('/', auth, listController.createList);
router.get('/:id', listController.getList);
router.put('/:id', auth, listController.updateList);
router.delete('/:id', auth, listController.deleteList);

export default router; 