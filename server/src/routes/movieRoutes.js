import express from 'express';
import { MovieController } from '../controllers/movieController.js';

const router = express.Router();
const movieController = new MovieController();

// GET routes for different movie sections
router.get('/trending', movieController.getTrendingMovies);
router.get('/popular', movieController.getPopularMovies);
router.get('/boxoffice', movieController.getBoxOfficeMovies);
router.get('/critics', movieController.getCriticsChoice);
router.get('/new', movieController.getNewReleases);
router.get('/topgenre', movieController.getTopByGenre);

export default router; 