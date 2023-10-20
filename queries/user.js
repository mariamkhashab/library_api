const signUpQuery = "insert into users(name,email) values ($1,$2)";

const logInQuery = "select * from users where email = $1";

const getAllUsersQuery = "select * from users";

const deleteUserQuery = "delete from users where id = $1 ";

const getUserByIDQuery = "select * from users where id = $1";

const borrowQuery =
  "insert into transactions(userID,bookID,transaction_state, transaction_type)values($1,$2,$3,$4)";

const getTransactionQuery =
  " select * from transactions where userID =$1 and bookID = $2 and transaction_state = $3 and transaction_type = $4";
module.exports = {
  signUpQuery,
  logInQuery,
  getAllUsersQuery,
  deleteUserQuery,
  getUserByIDQuery,
  borrowQuery,
  getTransactionQuery,
};
