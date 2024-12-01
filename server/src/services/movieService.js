import { db } from '../config/db.config.js';
import { redis } from '../config/redis.js';

export class MovieService {
    // Helper method to format movie data
    formatMovieData(movies) {
        return movies.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: parseFloat(movie.vote_average),
            vote_count: parseInt(movie.vote_count),
            popularity: parseFloat(movie.popularity),
            original_language: movie.original_language
        }));
    }

    async getTrendingMovies() {
        try {
            const result = await db.query(
                'SELECT * FROM movies_on_moviepage WHERE category = $1 ORDER BY popularity DESC LIMIT 10',
                ['trending']
            );
            return this.formatMovieData(result.rows);
        } catch (error) {
            console.error('Database Error:', error);
            throw new Error('Error fetching trending movies');
        }
    }

    async getPopularMovies() {
        try {
            const result = await db.query(
                'SELECT * FROM movies_on_moviepage WHERE category = $1 ORDER BY popularity DESC LIMIT 10',
                ['popular']
            );
            return this.formatMovieData(result.rows);
        } catch (error) {
            throw new Error('Error fetching popular movies');
        }
    }

    async getBoxOfficeMovies() {
        try {
            const result = await db.query(
                'SELECT * FROM movies_on_moviepage WHERE category = $1 ORDER BY vote_count DESC LIMIT 10',
                ['boxoffice']
            );
            return this.formatMovieData(result.rows);
        } catch (error) {
            throw new Error('Error fetching box office movies');
        }
    }

    async getCriticsChoice() {
        try {
            const result = await db.query(
                'SELECT * FROM movies_on_moviepage WHERE vote_average >= 7.5 AND vote_count >= 100 ORDER BY vote_average DESC LIMIT 10'
            );
            return this.formatMovieData(result.rows);
        } catch (error) {
            throw new Error('Error fetching critics choice movies');
        }
    }

    async getNewReleases() {
        try {
            const result = await db.query(
                `SELECT * FROM movies_on_moviepage 
                 WHERE category = 'new' 
                 AND release_date >= CURRENT_DATE - INTERVAL '90 days' 
                 ORDER BY release_date DESC 
                 LIMIT 10`
            );

            if (result.rows.length === 0) {
                const fallbackResult = await db.query(
                    `SELECT * FROM movies_on_moviepage 
                     WHERE category = 'new' 
                     ORDER BY release_date DESC 
                     LIMIT 10`
                );
                return this.formatMovieData(fallbackResult.rows);
            }

            return this.formatMovieData(result.rows);
        } catch (error) {
            console.error('Error in getNewReleases:', error);
            throw new Error('Error fetching new releases');
        }
    }

    async getTopByGenre() {
        try {
            const result = await db.query(
                'SELECT * FROM movies_on_moviepage WHERE category = $1 ORDER BY vote_average DESC LIMIT 10',
                ['topgenre']
            );
            return this.formatMovieData(result.rows);
        } catch (error) {
            throw new Error('Error fetching genre movies');
        }
    }
}

export const movieService = new MovieService(); 