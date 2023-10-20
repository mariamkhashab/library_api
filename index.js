const express = require("express");
const app = express();
const Joi = require("joi"); // auto validation
app.use(express.json()); // middleware to parse json from request bodies
require("dotenv").config();
const { Sequelize } = require("sequelize");

const server_port = process.env.SERVER_PORT;
const host = process.env.HOST;
const db_username = process.env.DB_USERNAME;
const db_port = process.env.DB_PORT;
const db_password = process.env.PASSWORD;
const db_name = process.env.DATABASE;

console.log(host, db_username, db_password, db_name, db_port);
const sequelize = new Sequelize(db_name, db_username, db_password, {
  host: host,
  port: db_port,
  dialect: "postgres",
});
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDbConnection();
module.exports = { sequelize, testDbConnection };
