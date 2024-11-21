import { db } from '../config/database';
import { redis } from '../config/redis';

export class MovieService {
    async getMovie(id) {
        // Try cache first
        const cachedMovie = await redis.get(`movie:${id}`);
        if (cachedMovie) {
            return JSON.parse(cachedMovie);
        }
        
        // Get from database
        const result = await db.query(
            'SELECT * FROM movies WHERE id = $1',
            [id]
        );
        
        if (result.rows[0]) {
            // Cache for 1 hour
            await redis.setex(
                `movie:${id}`,
                3600,
                JSON.stringify(result.rows[0])
            );
        }
        
        return result.rows[0];
    }
    
    async createReview(userId, movieId, reviewData) {
        const { rating, reviewText, containsSpoilers, visibility } = reviewData;
        
        const result = await db.query(
            `INSERT INTO reviews 
             (user_id, movie_id, rating, review_text, contains_spoilers, visibility)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [userId, movieId, rating, reviewText, containsSpoilers, visibility]
        );
        
        // Invalidate relevant caches
        await redis.del(`user:${userId}:reviews`);
        await redis.del(`movie:${movieId}:reviews`);
        
        return result.rows[0];
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

    async updateReview(reviewId, userId, reviewData) {
        const result = await db.query(
            `UPDATE reviews 
             SET rating = $1, review_text = $2, contains_spoilers = $3, 
                 visibility = $4, updated_at = CURRENT_TIMESTAMP
             WHERE id = $5 AND user_id = $6
             RETURNING *`,
            [
                reviewData.rating,
                reviewData.reviewText,
                reviewData.containsSpoilers,
                reviewData.visibility,
                reviewId,
                userId
            ]
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

    async searchMovies(query, { page = 1, limit = 20 }) {
        const offset = (page - 1) * limit;
        
        // Create a search query using PostgreSQL's full-text search
        const result = await db.query(
            `SELECT *,
                ts_rank_cd(
                    to_tsvector('english', title || ' ' || COALESCE(overview, '')),
                    plainto_tsquery('english', $1)
                ) as relevance
             FROM movies
             WHERE to_tsvector('english', title || ' ' || COALESCE(overview, '')) @@ 
                   plainto_tsquery('english', $1)
             ORDER BY relevance DESC
             LIMIT $2 OFFSET $3`,
            [query, limit, offset]
        );
        
        return result.rows;
    }
} 