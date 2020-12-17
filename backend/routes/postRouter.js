const express = require("express");
const protect = require("../middlewares/protect");
const postController = require("../controllers/postController");
const postRouter = express.Router();

postRouter.post("/", protect, postController.createPost);

module.exports = postRouter;