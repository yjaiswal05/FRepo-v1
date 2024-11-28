import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from '../config/db.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
    try {
        // First, try to create the UUID extension
        await db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        console.log('UUID extension enabled successfully');

        // Wait a moment to ensure the extension is fully enabled
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Read and execute the schema file
        const schema = fs.readFileSync(
            path.join(__dirname, 'schema.sql'),
            'utf8'
        );

        await db.query(schema);
        console.log('Database schema initialized successfully');

    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

export default initializeDatabase;