// database configuration
const host = process.env.HOST;
const user = process.env.DB_USERNAME;
const db_port = process.env.DB_PORT;
const db_password = process.env.PASSWORD;
const database_name = process.env.DATABASE;
const platform = process.env.platform;

const PG_client = require("pg").Pool;
var db_client = null;
if (platform == "DEV") {
  db_client = new PG_client({
    host: host,
    user: user,
    port: db_port,
    password: db_password,
    database: database_name,
  });
} else {
  db_client = new PG_client({
    connectionString: process.env.POSTGRES_LIB_URL + "?sslmode=require",
  });
}
db_client.connect((err) => {
  if (err) throw err;
  console.log("Connection to database established successfully");
});

module.exports = db_client;
