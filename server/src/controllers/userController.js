import { UserService } from '../services/userService';

export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    register = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            
            if (!username || !email || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const user = await this.userService.createUser({ username, email, password });
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            const result = await this.userService.authenticate(email, password);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    getProfile = async (req, res, next) => {
        try {
            const user = await this.userService.getUserById(req.user.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    updateProfile = async (req, res, next) => {
        try {
            const updates = req.body;
            const user = await this.userService.updateUser(req.user.id, updates);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
} 