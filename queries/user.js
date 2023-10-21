const signUpQuery = "insert into users(name,email,password) values ($1,$2,$3)";

const logInQuery = "select * from users where email = $1";

const getAllUsersQuery = "select * from users";

const deleteUserQuery = "delete from users where id = $1 ";

const getUserByIDQuery = "select * from users where id = $1";

const getUserByEmailQuery = "select * from users where email = $1";

const borrowQuery =
  "insert into transactions(userID,bookID,transaction_state, transaction_type)values($1,$2,$3,$4)";

const getTransactionQuery =
  " select * from transactions where userID =$1 and bookID = $2 and transaction_state = $3 and transaction_type = $4";

const listMyBooksQuery =
  "select book.title from book inner join transactions t on t.bookID = book.id where t.transaction_type = 1 and userID = $1 and bookID not in (select bookID from transactions t2 where userID = t.userID and t2.transaction_type = 2)";

module.exports = {
  signUpQuery,
  logInQuery,
  getAllUsersQuery,
  deleteUserQuery,
  getUserByIDQuery,
  borrowQuery,
  getTransactionQuery,
  getUserByEmailQuery,
  listMyBooksQuery,
};
