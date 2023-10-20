const { Router } = require("express");
const {
  getAllBooks,
  getBookByID,
  addNewBook,
  deleteExistingBook,
  updateBook,
} = require("../controllers/book.js");
const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookByID);
router.post("/", addNewBook);
router.delete("/", deleteExistingBook);
router.put("/:id", updateBook);

module.exports = router;
