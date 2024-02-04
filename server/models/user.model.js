// models/user.ts
import mongoose, { Document, Schema } from "mongoose";

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

export default UserModel;
