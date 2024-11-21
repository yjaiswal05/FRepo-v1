import { db } from '../config/database';

export class ListService {
    async getUserLists(userId) {
        const result = await db.query(
            'SELECT * FROM lists WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    }

    async createList(userId, listData) {
        const { title, description, isPrivate } = listData;
        
        const result = await db.query(
            `INSERT INTO lists (user_id, title, description, is_private)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [userId, title, description, isPrivate]
        );
        
        return result.rows[0];
    }

    async getList(listId) {
        const list = await db.query(
            `SELECT l.*, 
                    json_agg(json_build_object(
                        'movie_id', m.id,
                        'title', m.title,
                        'poster_url', m.poster_url,
                        'position', lm.position,
                        'notes', lm.notes
                    )) as movies
             FROM lists l
             LEFT JOIN list_movies lm ON l.id = lm.list_id
             LEFT JOIN movies m ON lm.movie_id = m.id
             WHERE l.id = $1
             GROUP BY l.id`,
            [listId]
        );
        
        return list.rows[0];
    }

    async updateList(listId, userId, updates) {
        const result = await db.query(
            `UPDATE lists 
             SET title = $1, description = $2, is_private = $3, 
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $4 AND user_id = $5
             RETURNING *`,
            [
                updates.title,
                updates.description,
                updates.isPrivate,
                listId,
                userId
            ]
        );

        if (!result.rows[0]) {
            throw new Error('List not found or unauthorized');
        }

        return result.rows[0];
    }

    async deleteList(listId, userId) {
        const result = await db.query(
            'DELETE FROM lists WHERE id = $1 AND user_id = $2',
            [listId, userId]
        );

        if (result.rowCount === 0) {
            throw new Error('List not found or unauthorized');
        }
    }
} 