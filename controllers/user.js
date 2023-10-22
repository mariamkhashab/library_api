const db_client = require("../database");
const bcrypt = require("bcryptjs");
const validator = require("email-validator");

const { sign } = require("../middleware/authorization");
const {
  signUpQuery,
  logInQuery,
  getAllUsersQuery,
  deleteUserQuery,
  getUserByIDQuery,
  borrowQuery,
  getTransactionQuery,
  getUserByEmailQuery,
  listMyBooksQuery,
} = require("../queries/user");

const {
  updateBookQuantityQuery,
  getBookQuantityQuery,
} = require("../queries/book");
const { use } = require("../routes/book");
const { valid } = require("joi");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: "Email or password missing.",
    });
  } else {
    if (validator.validate(email)) {
      const hashed_password = await bcrypt.hash(password, 5);
      db_client.query(getUserByEmailQuery, [email], (error, results) => {
        if (!error) {
          if (results.rows.length == 0) {
            db_client.query(
              signUpQuery,
              [name, email, hashed_password],
              (e, r) => {
                if (!e) {
                  res
                    .status(201)
                    .send(
                      "added successfully, use email and password to log in"
                    );
                } else {
                  res.status(400).send(e.message);
                }
              }
            );
          } else {
            res.status(400).send("user with this email already exists, login?");
          }
        } else {
          res.status(500).send(error);
        }
      });
    } else {
      res.status(400).send("Please enter a valid email");
    }
  }
};

const getAllUsers = (req, res) => {
  db_client.query(getAllUsersQuery, (error, results) => {
    if (!error) {
      res.status(200).json(results.rows);
    } else {
      res.status(400).json(results.rows);
    }
  });
};

const getUserProfile = (req, res) => {
  const id = req.params.id;
  db_client.query(getUserByIDQuery, [id], (error, results) => {
    if (!error) {
      if (results.rows.length != 0) {
        res.status(200).json(results.rows);
      } else {
        res.status(404).send("No user exists with this id");
      }
    } else {
      res.status(400).send(error);
    }
  });
};

const logIn = (req, res) => {
  const { email, password } = req.body;
  var user_passsword = null;
  var access_token = null;
  if (email == {}) {
    res.status(400).send("please enter a valid email");
  }
  db_client.query(getUserByEmailQuery, [email], (error, result) => {
    if (!error) {
      if (result.rows.length == 0) {
        res.status(400).send("user with this email doesnt exist, signup?");
      }
    } else {
      res.status(500).send(error);
    }
    user_passsword = result.rows[0]["password"];
    bcrypt.compare(password, user_passsword, (err, succ) => {
      console.log(err, succ);
      if (err) {
        res.status(400).send(err);
      }
      if (succ) {
        access_token = sign(result.rows[0]);
        res.status(200).json({
          message: "Logged in successfully",
          access_token: access_token,
        });
      } else {
        res.status(400).send("Please enter the correct password");
      }
    });
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  db_client.query(getUserByIDQuery, [id], (error, results) => {
    if (!error) {
      if (results.rows.length != 0) {
        db_client.query(deleteUserQuery, [id], (error, results) => {
          if (!error) {
            res.status(200).send("Deleted successfully");
          } else {
            res.status(400).send("something went wrong while deleting");
          }
        });
      } else {
        res.status(404).send("No user exists with this id");
      }
    } else {
      res.status(400).send(error);
    }
  });
};

const borrow = (request, response) => {
  const { userID, bookID, transaction_state, transaction_type } = request.body;

  db_client.query(getBookQuantityQuery, [bookID], (err, results) => {
    if (!err) {
      console.log(results.rows[0].quantity);
      const quantity = results.rows[0].quantity;
      if (quantity <= 0) {
        response.status(400).send("Book out of stock");
      } else {
        db_client.query(
          borrowQuery,
          [userID, bookID, transaction_state, transaction_type],
          (error, b_result) => {
            if (!error) {
              db_client.query(
                updateBookQuantityQuery,
                [quantity - 1, bookID],
                (e, r) => {
                  response
                    .status(200)
                    .send(
                      "Transaction completed and database updated successfully"
                    );
                }
              );
            } else {
              response.status(500).send(error.message);
            }
          }
        );
      }
    } else {
      res.status(500).send(err);
    }
  });
};

const refund = (request, response) => {
  const { userID, bookID, transaction_state, transaction_type } = request.body;

  db_client.query(getBookQuantityQuery, [bookID], (err, results) => {
    if (!err) {
      console.log(results.rows[0].quantity);
      const quantity = results.rows[0].quantity;
      db_client.query(
        borrowQuery,
        [userID, bookID, transaction_state, transaction_type],
        (error, b_result) => {
          if (!error) {
            db_client.query(
              updateBookQuantityQuery,
              [quantity + 1, bookID],
              (e, r) => {
                response
                  .status(200)
                  .send(
                    "Transaction completed and database updated successfully"
                  );
              }
            );
          } else {
            response.status(500).send(error.message);
          }
        }
      );
    } else {
      response.status(500).send(err);
    }
  });
};

const listMyBooks = (req, res) => {
  console.log("url", req.user);
  const auth_id = req.user["id"];
  const id = req.params.id;
  if (auth_id != id) {
    res.status(403).send("Not authorized");
  } else {
    db_client.query(listMyBooksQuery, [id], (err, result) => {
      if (!err) {
        res.status(200).json(result.rows);
      } else {
        res.status(500).send(error);
      }
    });
  }
};

module.exports = {
  signUp,
  getAllUsers,
  logIn,
  deleteUser,
  getUserProfile,
  borrow,
  refund,
  listMyBooks,
};
