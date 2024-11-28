import { db } from '../config/db.config.js';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    async createUser(userData) {
        const { username, email, password } = userData;
        
        // Hash password
        const passwordHash = await hash(password, 10);
        
        // Insert user
        const result = await db.query(
            `INSERT INTO users (username, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING id, username, email, created_at`,
            [username, email, passwordHash]
        );
        
        return result.rows[0];
    }
    
    async authenticate(email, password) {
        const user = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        
        if (!user.rows[0]) {
            throw new Error('User not found');
        }
        
        const isValid = await compare(password, user.rows[0].password_hash);
        
        if (!isValid) {
            throw new Error('Invalid password');
        }
        
        // Generate JWT
        const token = jwt.sign(
            { userId: user.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        return { user: user.rows[0], token };
    }
} 