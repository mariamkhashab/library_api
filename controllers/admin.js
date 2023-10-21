const db_client = require("../database");
const Joi = require("joi"); // auto validation

const { getOverDueLoansQuery, isAdmin } = require("../queries/admin");

const getOverDueLoans = (req, res) =>
  db_client.query(isAdmin, [req.user["id"]], (e, r) => {
    if (r.rows[0]["roleid"] == 1) {
      db_client.query(getOverDueLoansQuery, (error, results) => {
        if (!error) {
          res.status(200).json(results.rows);
        } else {
          console.log(error);
          res.status(400).send(error);
        }
      });
    } else {
      res.status(401).send("Role unauthorized");
    }
  });

module.exports = { getOverDueLoans };
