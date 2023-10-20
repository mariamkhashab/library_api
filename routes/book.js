const { Router } = require("express");
const {
  getAllBooks,
  getBookByID,
  addNewBook,
  deleteExistingBook,
} = require("../controllers/book.js");
const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookByID);
router.post("/", addNewBook);
router.delete("/:id", deleteExistingBook);

module.exports = router;
