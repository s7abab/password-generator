const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./db/connection");
const cors = require("cors")

dotenv.config();

const app = express();
connectDb();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan("dev"));
app.use(cors())

// routes
app.use("/", require("./routes/user.route"));

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
