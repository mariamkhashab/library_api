// database configuration
const host = process.env.HOST;
const user = process.env.DB_USERNAME;
const db_port = process.env.DB_PORT;
const db_password = process.env.PASSWORD;
const database_name = process.env.DATABASE;

const PG_client = require("pg").Pool;
const db_client = new PG_client({
  connectionString: process.env.POSTGRES_LIB_URL + "?sslmode=require",
});
db_client.connect((err) => {
  if (err) throw err;
  console.log("Connection to database established successfully");
});

module.exports = db_client;
