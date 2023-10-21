const express = require("express");
const app = express();

app.use(express.json()); // middleware to parse json from request bodies
require("dotenv").config();

// import routes
const bookRoutes = require("./routes/book.js");
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js");

// use routes
app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

const server_port = process.env.SERVER_PORT;
app.listen(server_port, () => {
  console.log(`listening on port ${server_port}`);
});
