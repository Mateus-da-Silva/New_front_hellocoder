const mysql = require('mysql2');
require('dotenv').config();

// Criar pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Usar promises ao invés de callbacks
const promisePool = pool.promise();

// Testar conexão
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  console.log('✅ Conectado ao banco de dados MySQL');
  connection.release();
});

module.exports = promisePool;