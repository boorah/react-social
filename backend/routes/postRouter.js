const express = require("express");
const protect = require("../middlewares/protect");
const postController = require("../controllers/postController");
const postRouter = express.Router();

postRouter.get("/feed", protect, postController.getUserFeed);
postRouter.get("/explore", protect, postController.getUndiscoveredPosts);
postRouter.get("/:id", protect, postController.getPostDetails);
postRouter.put("/likes/:id", protect, postController.toggleLike);
postRouter.put("/comments/:id", protect, postController.addComment);
postRouter.post("/", protect, postController.createPost);

module.exports = postRouter;