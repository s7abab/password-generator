const express = require("express");
const { default: UserModel } = require("../models/user.model");

const router = express.Router();

router.post("/user", async (req, res) => {
  const { name, email } = req.body;
  const user = await UserModel.create({
    name,
    email,
  });

  res.status(201).json({
    success:true,
    messagee
  })
});
