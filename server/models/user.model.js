// models/user.ts
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwords: {
    type: [String],
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
