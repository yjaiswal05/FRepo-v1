import express from 'express';
import { MovieController } from '../controllers/movieController.js';

const router = express.Router();
const movieController = new MovieController();

// GET routes
router.get('/', movieController.getMovies);

// POST routes - make sure these have proper callback functions
router.post('/:id/favorite', movieController.toggleFavorite);
router.post('/:id/watchlist', movieController.toggleWatchlist);

export default router; 