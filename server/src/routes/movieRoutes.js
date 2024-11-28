import express from 'express';
import { MovieController } from '../controllers/movieController.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();
const movieController = new MovieController();

// Basic movie routes
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovie);
router.get('/:id/reviews', movieController.getMovieReviews);
router.get('/hero-images', movieController.getHeroImages);

// Protected routes (require authentication)
router.post('/:id/reviews', auth, movieController.createReview);
router.put('/reviews/:reviewId', auth, movieController.updateReview);
router.delete('/reviews/:reviewId', auth, movieController.deleteReview);

export default router; 