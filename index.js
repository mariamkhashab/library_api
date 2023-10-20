const express = require("express");
const app = express();

app.use(express.json()); // middleware to parse json from request bodies
require("dotenv").config();

// import routes
const bookRoutes = require("./routes/book.js");

// use routes
app.use("/books", bookRoutes);

const server_port = process.env.SERVER_PORT;
app.listen(server_port, () => {
  console.log(`listening on port ${server_port}`);
});
