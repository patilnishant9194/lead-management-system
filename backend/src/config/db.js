const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lead_management",
  password: "Nishu@2003",
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log("PostgreSQL Connected");
  })
  .catch((err) => {
    console.log("Database connection error");
    console.log(err);
  });

module.exports = pool;