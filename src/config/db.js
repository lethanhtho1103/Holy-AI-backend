const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Kết nối MySQL thất bại:", err.message);
  } else {
    console.log("✅ Kết nối MySQL thành công!");
    connection.release();
  }
});

module.exports = pool.promise();
