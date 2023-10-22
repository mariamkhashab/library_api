const { Router } = require("express");
const {
  getAllBooks,
  getBookByID,
  addNewBook,
  deleteExistingBook,
} = require("../controllers/book.js");
const router = Router();

/**
 * @api {get} /books/ List all books in the system
 * @apiName getAllBooks
 * @apiGroup admin
 * @apiHeader {string} Bearer Authenticaton Token
 **/
router.get("/", getAllBooks);

/**
 * @api {get} /books/:id Get a book by id
 * @apiName getBookByID
 * @apiParam {int} id book ID
 * @apiHeader {string} Bearer Authenticaton Token
 **/
router.get("/:id", getBookByID);

/**
 * @api {post} /books/addNewBook Add new book to the system
 * @apiName addNewBook
 * @apiHeader {string} Bearer Authenticaton Token
 **/
router.post("/", addNewBook);

/**
 * @api {get} /books/:id Delete an existing book
 * @apiName deleteExistingBook
 * @apiGroup admin
 * @apiParam {int} id book ID
 * @apiHeader {string} Bearer Authenticaton Token
 **/
router.delete("/:id", deleteExistingBook);

module.exports = router;
