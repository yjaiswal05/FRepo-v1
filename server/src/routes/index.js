import express from 'express';
import userRoutes from './userRoutes';
import movieRoutes from './movieRoutes';
import listRoutes from './listRoutes';
import socialRoutes from './socialRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/lists', listRoutes);
router.use('/social', socialRoutes);

export default router; 