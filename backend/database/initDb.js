const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabase() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const port = process.env.DB_PORT || 3306;

  console.log(`Connecting to MySQL server at ${host}:${port}...`);
  try {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      port,
      multipleStatements: true
    });

    console.log('Connected to MySQL successfully. Reading schema.sql...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema and seed scripts...');
    await connection.query(sql);
    console.log('✅ Database `hacwms_db` initialized with all 11 tables and seed data!');
    await connection.end();
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    console.log('\nTip: Make sure MySQL (e.g. XAMPP, WAMP, or MySQL Server) is running on port 3306.');
    console.log('You can edit backend/.env to configure your DB_USER, DB_PASSWORD, and DB_PORT.');
  }
}

if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;
