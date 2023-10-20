const signUpQuery = "insert into users(name,email) values ($1,$2)";

const logInQuery = "select * from users where email = $1";

const getAllUsersQuery = "select * from users";

const deleteUserQuery = "delete from users where id = $1 ";

const getUserByIDQuery = "select * from users where id = $1";
module.exports = {
  signUpQuery,
  logInQuery,
  getAllUsersQuery,
  deleteUserQuery,
  getUserByIDQuery,
};
