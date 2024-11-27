const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',      // your PostgreSQL username
  host: 'localhost',
  database: 'film_social', // your database name
  password: 'root', // your PostgreSQL password
  port: 5432,
});

// Add error handling
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });
module.exports = pool;