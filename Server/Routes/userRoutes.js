const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../Controller/userController");
const auth = require("../middlewares/auth");

const userRouter = express.Router();

// to register an user
userRouter.post("/register", registerUser);

// to login an user
userRouter.post("/login", loginUser);

// to get current user data
userRouter.get("/get-current-user", auth, getCurrentUser);

module.exports = userRouter;
