const express = require("express");
const protect = require("../middlewares/protect");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/follow", protect, userController.getUsersToFollow);
userRouter.put("/update", protect, userController.updateUser);
userRouter.get("/:username", protect, userController.getUserDetails);
userRouter.get("/:username/liked", protect, userController.getLikedPosts);
userRouter.get("/:username/posts", protect, userController.getUserPosts);
userRouter.get("/:username/following", protect, userController.getUserFollowing);
userRouter.get("/:username/followers", protect, userController.getUserFollowers);
userRouter.put("/follow/:id", protect, userController.toggleFollow);
userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.authUser);

module.exports = userRouter;