import { db } from '../config/db.config.js';

export class HeroImageService {
    async getHeroImages() {
        try {
            console.log('Fetching hero images from database...');
            const query = `
                SELECT 
                    id,
                    title,
                    overview,
                    backdrop_path,
                    release_date,
                    poster_path
                FROM movies 
                WHERE backdrop_path IS NOT NULL 
                ORDER BY release_date DESC 
                LIMIT 5
            `;
            
            const result = await db.query(query);
            console.log('Found hero images:', result.rows);
            return result.rows;
        } catch (error) {
            console.error('Database error when fetching hero images:', error);
            throw error;
        }
    }
}