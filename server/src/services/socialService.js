import { db } from '../config/database';
import { redis } from '../config/redis';

export class SocialService {
    async followUser(followerId, followingId) {
        if (followerId === followingId) {
            throw new Error('Users cannot follow themselves');
        }

        try {
            await db.query(
                'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)',
                [followerId, followingId]
            );

            // Invalidate relevant caches
            await redis.del(`user:${followerId}:following`);
            await redis.del(`user:${followingId}:followers`);

            // Create activity
            await this.createActivity({
                userId: followerId,
                type: 'FOLLOW',
                targetUserId: followingId
            });
        } catch (error) {
            if (error.constraint === 'follows_pkey') {
                throw new Error('Already following this user');
            }
            throw error;
        }
    }

    async unfollowUser(followerId, followingId) {
        const result = await db.query(
            'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
            [followerId, followingId]
        );

        if (result.rowCount === 0) {
            throw new Error('Not following this user');
        }

        // Invalidate relevant caches
        await redis.del(`user:${followerId}:following`);
        await redis.del(`user:${followingId}:followers`);
    }

    async getFollowers(userId) {
        const cachedFollowers = await redis.get(`user:${userId}:followers`);
        if (cachedFollowers) {
            return JSON.parse(cachedFollowers);
        }

        const result = await db.query(
            `SELECT u.id, u.username, u.profile_picture_url
             FROM follows f
             JOIN users u ON f.follower_id = u.id
             WHERE f.following_id = $1
             ORDER BY f.created_at DESC`,
            [userId]
        );

        await redis.setex(
            `user:${userId}:followers`,
            3600,
            JSON.stringify(result.rows)
        );

        return result.rows;
    }

    async getFollowing(userId) {
        const cachedFollowing = await redis.get(`user:${userId}:following`);
        if (cachedFollowing) {
            return JSON.parse(cachedFollowing);
        }

        const result = await db.query(
            `SELECT u.id, u.username, u.profile_picture_url
             FROM follows f
             JOIN users u ON f.following_id = u.id
             WHERE f.follower_id = $1
             ORDER BY f.created_at DESC`,
            [userId]
        );

        await redis.setex(
            `user:${userId}:following`,
            3600,
            JSON.stringify(result.rows)
        );

        return result.rows;
    }

    async getActivityFeed(userId, { page = 1, limit = 20 }) {
        const offset = (page - 1) * limit;

        const result = await db.query(
            `WITH following_ids AS (
                SELECT following_id FROM follows WHERE follower_id = $1
            )
            SELECT a.*, 
                   u.username, u.profile_picture_url,
                   m.title as movie_title,
                   r.rating as review_rating,
                   l.title as list_title
            FROM activities a
            JOIN users u ON a.user_id = u.id
            LEFT JOIN movies m ON a.movie_id = m.id
            LEFT JOIN reviews r ON a.review_id = r.id
            LEFT JOIN lists l ON a.list_id = l.id
            WHERE a.user_id IN (SELECT following_id FROM following_ids)
            ORDER BY a.created_at DESC
            LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        );

        return result.rows;
    }

    async getUserActivities(userId, { page = 1, limit = 20 }) {
        const offset = (page - 1) * limit;

        const result = await db.query(
            `SELECT a.*, 
                   u.username, u.profile_picture_url,
                   m.title as movie_title,
                   r.rating as review_rating,
                   l.title as list_title
            FROM activities a
            JOIN users u ON a.user_id = u.id
            LEFT JOIN movies m ON a.movie_id = m.id
            LEFT JOIN reviews r ON a.review_id = r.id
            LEFT JOIN lists l ON a.list_id = l.id
            WHERE a.user_id = $1
            ORDER BY a.created_at DESC
            LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        );

        return result.rows;
    }

    async createActivity(activityData) {
        const {
            userId,
            type,
            movieId,
            reviewId,
            listId,
            targetUserId
        } = activityData;

        await db.query(
            `INSERT INTO activities 
             (user_id, type, movie_id, review_id, list_id, target_user_id)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [userId, type, movieId, reviewId, listId, targetUserId]
        );
    }
} 