const mysql = require('mysql2/promise');
require('dotenv').config();
const { mockQuery } = require('./mockDb');

let pool = null;
let useMySQL = false;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hacwms_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });

  // Probe MySQL connection
  pool.getConnection()
    .then(conn => {
      useMySQL = true;
      console.log('✅ Connected to MySQL database `hacwms_db` successfully!');
      conn.release();
    })
    .catch(err => {
      useMySQL = false;
      console.log('ℹ️  MySQL is not currently reachable on port 3306.');
      console.log('👉 Activating built-in HACWMS Database Engine with full seed data (17 questions, 4 quizzes, activities, and admin/user accounts).');
      console.log('💡 When you start MySQL (e.g. XAMPP/WAMP), run `npm run init-db` to switch to live MySQL.\n');
    });
} catch (e) {
  useMySQL = false;
}

// Resilient Query Wrapper
async function query(sql, params) {
  if (useMySQL && pool) {
    try {
      return await pool.query(sql, params);
    } catch (err) {
      console.warn('MySQL query error, falling back to in-memory store:', err.message);
      return await mockQuery(sql, params);
    }
  } else {
    return await mockQuery(sql, params);
  }
}

module.exports = {
  query,
  pool
};
