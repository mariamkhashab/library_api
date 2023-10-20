// database configuration
const host = process.env.HOST;
const user = process.env.DB_USERNAME;
const db_port = process.env.DB_PORT;
const db_password = process.env.PASSWORD;
const database_name = process.env.DATABASE;

const PG_client = require("pg").Pool;
const db_client = new PG_client({
  host: host,
  user: user,
  port: db_port,
  password: db_password,
  database: database_name,
});
db_client.connect();

module.exports = db_client;
