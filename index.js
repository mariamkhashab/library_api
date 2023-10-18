const express = require("express");
const app = express();
const Joi = require("joi"); // auto validation
app.use(express.json()); // middleware to parse json from request bodies
require("dotenv").config();
const server_port = process.env.SERVER_PORT;
const host = process.env.HOST;
const user = process.env.USER;
const db_port = process.env.DB_PORT;
const db_password = process.env.PASSWORD;
const db_username = process.env.DATABASE;

const PG_client = require("pg").Client;
const db_client = new PG_client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres",
  database: "postgres",
});
db_client.connect();

app.get("/", (req, res1) => {
  db_client.query(`select * from book`, (err, res2) => {
    if (!err) {
      res1.status(200).send(res2.rows);
    } else {
      console.log(err.message);
    }
  });
});

app.listen(server_port, () => {
  console.log(`listening on port ${server_port}`);
});
