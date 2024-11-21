import express from 'express';
import { MovieController } from '../controllers/movieController';
import { auth } from '../middleware/auth';

const router = express.Router();
const movieController = new MovieController();

// Movie routes
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovie);
router.get('/:id/reviews', movieController.getMovieReviews);

// Review routes (requires authentication)
router.post('/:id/reviews', auth, movieController.createReview);
router.put('/reviews/:reviewId', auth, movieController.updateReview);
router.delete('/reviews/:reviewId', auth, movieController.deleteReview);

// Lists routes
router.post('/:id/lists/:listId', auth, movieController.addToList);
router.delete('/:id/lists/:listId', auth, movieController.removeFromList);

export default router; 