import { MovieService } from '../services/movieService';

export class MovieController {
    constructor() {
        this.movieService = new MovieService();
    }

    getMovies = async (req, res, next) => {
        try {
            const { page = 1, limit = 20, genre, year, sort } = req.query;
            const movies = await this.movieService.getMovies({ page, limit, genre, year, sort });
            res.json(movies);
        } catch (error) {
            next(error);
        }
    }

    getMovie = async (req, res, next) => {
        try {
            const movie = await this.movieService.getMovie(req.params.id);
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            res.json(movie);
        } catch (error) {
            next(error);
        }
    }

    getMovieReviews = async (req, res, next) => {
        try {
            const { page = 1, limit = 20 } = req.query;
            const reviews = await this.movieService.getMovieReviews(req.params.id, { page, limit });
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }

    createReview = async (req, res, next) => {
        try {
            const review = await this.movieService.createReview(
                req.user.id,
                req.params.id,
                req.body
            );
            res.status(201).json(review);
        } catch (error) {
            next(error);
        }
    }

    updateReview = async (req, res, next) => {
        try {
            const review = await this.movieService.updateReview(
                req.params.reviewId,
                req.user.id,
                req.body
            );
            res.json(review);
        } catch (error) {
            next(error);
        }
    }

    deleteReview = async (req, res, next) => {
        try {
            await this.movieService.deleteReview(req.params.reviewId, req.user.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
} 