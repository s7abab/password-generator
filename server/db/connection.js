const mongoose = require("mongoose");

require("dotenv").config();

const dbUrl = process.env.MONGO_URL;
// mongodb database connection
const connectDb = async () => {
  try {
    if (dbUrl) {
      await mongoose.connect(dbUrl).then((data) => {
        console.log(`Database connected ${data.connection.host} 🥦`);
      });
    }
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDb, 5000);
  }
};

module.exports = connectDb;
