const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { default: connectDb } = require("./db/connection");

dotenv.config();

const app = express();
connectDb();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
