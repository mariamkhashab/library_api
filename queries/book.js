const getAllBooksQuery =
  "select * from book where 1=1 and author like $1 and title like $2 and ISBN::text like $3";
const getBookByIDQuery = "select * from book where id = $1";

const getBookByISBNQuery = "select * from book where ISBN = $1";

const addNewBookQuery =
  "insert into book(title,author,ISBN,quantity) values ($1, $2, $3, $4)";

const deleteExistingBookQuery = "delete from book where id = $1 ";
const getBookQuantityQuery = "select quantity from book where id = $1";
const updateBookQuantityQuery = "update book set quantity = $1 where id = $2";
module.exports = {
  getAllBooksQuery,
  addNewBookQuery,
  deleteExistingBookQuery,
  getBookByIDQuery,
  getBookQuantityQuery,
  updateBookQuantityQuery,
  getBookByISBNQuery,
};
