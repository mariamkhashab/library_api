const db_client = require("../database");
const Joi = require("joi"); // auto validation

const { getOverDueLoansQuery } = require("../queries/admin");

const getOverDueLoans = (req, res) =>
  db_client.query(getOverDueLoansQuery, (error, results) => {
    if (!error) {
      res.status(200).json(results.rows);
    } else {
      console.log(error);
      res.status(400).send(error);
    }
  });

module.exports = { getOverDueLoans };
