import app from './src/app';
import dotenv from 'dotenv';

dotenv.config();
const express = require('express');
const cors = require('cors');
const heroImagesRouter = require('./routes/heroImages');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    details: err.message 
  });
});

app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

app.use('/api', heroImagesRouter);
app.use('/api/movies', movieRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
