const express = require("express");
const UserModel = require("../models/user.model");

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide name or email",
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(200).json({
        success: true,
        user,
        message: "User fetched successfully",
      });
    }
    const newUser = await UserModel.create({
      name,
      email,
    });

    res.status(201).json({
      success: true,
      user: newUser,
      message: "User fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router
  .route("/password")
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide all fields",
        });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      user.passwords.push(password);
      await user.save();
      res.status(201).json({
        success: true,
        message: "Password saved",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  })
  .get(async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({email});
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      res.status(200).json({
        success: true,
        passwords: user.passwords,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

module.exports = router;
