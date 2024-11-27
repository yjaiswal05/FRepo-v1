const express = require('express');
const router = express.Router();
const pool = require('../db/config');

router.get('/hero-images', async (req, res) => {
  try {
    // Test database connection
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM hero_images WHERE is_active = true ORDER BY display_order'
      );
      console.log('Query result:', result.rows); // Debug log
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Database error', 
      details: err.message 
    });
  }
});

module.exports = router; 