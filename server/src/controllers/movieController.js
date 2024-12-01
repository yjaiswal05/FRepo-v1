import { movieService } from '../services/movieService.js';

export class MovieController {
    // Get Trending Movies
    getTrendingMovies = async (req, res) => {
        try {
            const movies = await movieService.getTrendingMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ 
                message: error.message
            });
        }
    }

    // Get Popular Movies
    getPopularMovies = async (req, res) => {
        try {
            const movies = await movieService.getPopularMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ 
                message: error.message
            });
        }
    }

    // Get Box Office Movies
    getBoxOfficeMovies = async (req, res) => {
        try {
            const movies = await movieService.getBoxOfficeMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ 
                message: error.message
            });
        }
    }

    // Get Critics Choice
    getCriticsChoice = async (req, res) => {
        try {
            const movies = await movieService.getCriticsChoice();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ 
                message: error.message
            });
        }
    }

    // Get New Releases
    getNewReleases = async (req, res) => {
        try {
            const movies = await movieService.getNewReleases();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ 
                message: error.message
            });
        }
    }

    // Get Top by Genre
    getTopByGenre = async (req, res) => {
        try {
            const movies = await movieService.getTopByGenre();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ 
                message: error.message
            });
        }
    }
} 