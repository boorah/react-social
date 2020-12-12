const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.authUser);

module.exports = userRouter;