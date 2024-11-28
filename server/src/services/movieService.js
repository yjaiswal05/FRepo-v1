import { db } from '../config/db.config.js';
import { redis } from '../config/redis.js';

export class MovieService {
    constructor() {
        this.useCache = redis !== null;
    }

    async getMovies({ page = 1, limit = 20, genre, year, sort }) {
        const offset = (page - 1) * limit;
        let query = 'SELECT * FROM movies';
        const params = [];
        
        if (genre || year) {
            query += ' WHERE';
            if (genre) {
                query += ' genre = $1';
                params.push(genre);
            }
            if (year) {
                query += genre ? ' AND' : '';
                query += ` EXTRACT(YEAR FROM release_date) = $${params.length + 1}`;
                params.push(year);
            }
        }

        if (sort) {
            query += ` ORDER BY ${sort}`;
        }

        query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
        params.push(limit, offset);

        const result = await db.query(query, params);
        return result.rows;
    }

    async getMovie(id) {
        try {
            // Try cache first if Redis is available
            if (this.useCache) {
                const cached = await redis.get(`movie:${id}`);
                if (cached) return JSON.parse(cached);
            }

            // Get from database
            const result = await db.query(
                'SELECT * FROM movies WHERE id = $1',
                [id]
            );

            const movie = result.rows[0];

            // Cache if Redis is available
            if (this.useCache && movie) {
                await redis.setex(`movie:${id}`, 3600, JSON.stringify(movie));
            }

            return movie;
        } catch (error) {
            console.error('Error getting movie:', error);
            throw error;
        }
    }

    async getMovieReviews(movieId, { page = 1, limit = 20 }) {
        const offset = (page - 1) * limit;
        const result = await db.query(
            `SELECT r.*, u.username 
             FROM reviews r
             JOIN users u ON r.user_id = u.id
             WHERE r.movie_id = $1
             ORDER BY r.created_at DESC
             LIMIT $2 OFFSET $3`,
            [movieId, limit, offset]
        );
        return result.rows;
    }

    async createReview(userId, movieId, reviewData) {
        const { rating, reviewText, containsSpoilers = false } = reviewData;
        
        const result = await db.query(
            `INSERT INTO reviews (user_id, movie_id, rating, review_text, contains_spoilers)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [userId, movieId, rating, reviewText, containsSpoilers]
        );
        
        return result.rows[0];
    }

    async updateReview(reviewId, userId, reviewData) {
        const { rating, reviewText, containsSpoilers } = reviewData;
        
        const result = await db.query(
            `UPDATE reviews 
             SET rating = $1, review_text = $2, contains_spoilers = $3,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $4 AND user_id = $5
             RETURNING *`,
            [rating, reviewText, containsSpoilers, reviewId, userId]
        );
        
        if (!result.rows[0]) {
            throw new Error('Review not found or unauthorized');
        }
        
        return result.rows[0];
    }

    async deleteReview(reviewId, userId) {
        const result = await db.query(
            'DELETE FROM reviews WHERE id = $1 AND user_id = $2',
            [reviewId, userId]
        );

        if (result.rowCount === 0) {
            throw new Error('Review not found or unauthorized');
        }
    }

    async getHeroImages() {
        const result = await db.query(
            'SELECT id, image_url FROM movies WHERE image_url IS NOT NULL LIMIT 5'
        );
        return result.rows;
    }
} 