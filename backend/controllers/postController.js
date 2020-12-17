const Post = require("../models/Post");

const createPost = async (request, response, next) => {
  const body = request.body;

  try {
    
    if (!body.content) {
      return next({ statusCode: 400, message: "Content is required!" });
    }

    const post = new Post({
      date: new Date(),
      createdBy: request.user._id,
      content: body.content
    });

    const savedPost = await post.save();

    response.status(200).json(savedPost);

  } catch (error) {
    next(error);
  }

};

module.exports = { createPost };