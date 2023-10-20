const db_client = require("../database");
const Joi = require("joi"); // auto validation

const {
  getAllBooksQuery,
  addNewBookQuery,
  deleteExistingBookQuery,
  getBookByIDQuery,
} = require("../queries/book");

const getAllBooks = (req, res) => {
  console.log("qqqqq", req.query);
  var param = [];
  search_query = getAllBooksQuery;
  if ("author" in req.query) {
    param.push("%" + req.query["author"] + "%");
  } else {
    param.push("%%");
  }
  if ("title" in req.query) {
    param.push("%" + req.query["title"] + "%");
  } else {
    param.push("%%");
  }

  if ("ISBN" in req.query) {
    param.push("%" + req.query["ISBN"] + "%");
  } else {
    param.push("%%");
  }
  db_client.query(search_query, param, (error, results) => {
    if (!error) {
      res.status(200).json(results.rows);
    } else {
      console.log(error);
      res.status(400).send(error);
    }
  });
};

const getBookByID = (req, res) => {
  const id = req.params.id;
  db_client.query(getBookByIDQuery, [id], (error, results) => {
    if (!error) {
      if (results.rows == []) {
        res.status(200).send("No book exists with this ID");
      } else {
        res.status(200).json(results.rows);
      }
    } else {
      res.status(400).json(results.rows);
    }
  });
};

const addNewBook = (req, res) => {
  const { title, author, ISBN, quantity } = req.body;

  db_client.query(
    addNewBookQuery,
    [title, author, ISBN, quantity],
    (error, results) => {
      if (!error) {
        res.status(201).send("added successfully");
      } else {
        res.status(400).send(error.message);
      }
    }
  );
};

const deleteExistingBook = (req, res) => {
  const { id } = req.body;
  db_client.query(deleteExistingBookQuery, [id], (error, results) => {
    if (!error) {
      res.status(201).send("deleted successfully");
    } else {
      res.status(400).send(error.message);
    }
  });
};

const updateBook = (req, res) => {
  const { id } = req.body;
  db_client.query(deleteExistingBookQuery, [id], (error, results) => {
    if (!error) {
      res.status(201).send("deleted successfully");
    } else {
      res.status(400).send(error.message);
    }
  });
};
module.exports = {
  getAllBooks,
  getBookByID,
  addNewBook,
  deleteExistingBook,
  updateBook,
};
