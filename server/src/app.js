import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import listRoutes from './routes/listRoutes.js';
import socialRoutes from './routes/socialRoutes.js';
import { errorHandler } from './middleware/error.middleware.js';
import heroImageRoutes from './routes/heroImageRoutes.js';
import initializeDatabase from './db/init.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize database
await initializeDatabase();

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/hero-images', heroImageRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;