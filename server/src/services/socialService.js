import { db } from '../config/db.config.js';
import { redis } from '../config/redis.js';

export class SocialService {
    constructor() {
        this.useCache = redis !== null;
    }

    async getFollowers(userId) {
        try {
            const result = await db.query(
                `SELECT u.* 
                 FROM users u
                 JOIN follows f ON f.follower_id = u.id
                 WHERE f.following_id = $1`,
                [userId]
            );
            return result.rows;
        } catch (error) {
            console.error('Error getting followers:', error);
            throw error;
        }
    }

    async getFollowing(userId) {
        try {
            const result = await db.query(
                `SELECT u.* 
                 FROM users u
                 JOIN follows f ON f.following_id = u.id
                 WHERE f.follower_id = $1`,
                [userId]
            );
            return result.rows;
        } catch (error) {
            console.error('Error getting following:', error);
            throw error;
        }
    }

    // Add other social service methods as needed
} 