const db_client = require("../database");
const Joi = require("joi"); // auto validation

const {
  signUpQuery,
  logInQuery,
  getAllUsersQuery,
  deleteUserQuery,
  getUserByIDQuery,
  borrowQuery,
  getTransactionQuery,
} = require("../queries/user");

const { updateBook } = require("../controllers/book");

const signUp = (req, res) => {
  const { name, email } = req.body;

  db_client.query(signUpQuery, [name, email], (error, results) => {
    if (!error) {
      res.status(201).send("added successfully");
    } else {
      res.status(400).send(error.message);
    }
  });
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
  const email = req.body["email"];
  console.log("email", email);

  if (email == {}) {
    res.status(400).send("please enter a valid email");
  } else {
    db_client.query(logInQuery, [email], (error, results) => {
      if (!error) {
        if (results.rows.length != 0) {
          res.status(200).json({ message: `user ${email}'s home feed` });
        } else {
          res.status(404).send("No user exists with this email, Sign up?");
        }
      } else {
        res.status(400).json(results.rows);
      }
    });
  }
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

const borrow = (req, res) => {
  const { userID, bookID, transaction_state, transaction_type } = req.body;
  db_client.query(
    borrowQuery,
    [userID, bookID, transaction_state, transaction_type],
    (error, results) => {
      if (!error) {
        borrowQuery({ req: { params: { id: bookID } } });
        db_client.query(
          getTransactionQuery,
          [userID, bookID, transaction_state, transaction_type],
          (e, r) => {
            if (!e) {
              res.status(200).json(r.rows);
            } else {
              res.status(400).send(e.message);
            }
          }
        );
      } else {
        res.status(400).send(error.message);
      }
    }
  );
};
module.exports = {
  signUp,
  getAllUsers,
  logIn,
  deleteUser,
  getUserProfile,
  borrow,
};
