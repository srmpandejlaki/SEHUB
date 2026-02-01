import pool from './src/config/db.js';

async function testConnection() {
  try {
    console.log('Attempting to connect to database...');
    console.log('Config:', {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    const res = await client.query('SELECT NOW()');
    console.log('Database time:', res.rows[0].now);
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('Database connection error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
}

testConnection();
