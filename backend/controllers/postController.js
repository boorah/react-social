const Post = require("../models/Post");
const Comment = require("../models/Comment");

const createPost = async (request, response, next) => {
  const body = request.body;
  const user = request.user;

  try {

    if (!body.content) {
      return next({ statusCode: 400, message: "Content is required!" });
    }

    const post = new Post({
      date: new Date(),
      createdBy: request.user._id,
      content: body.content
    });

    const savedPost = await (await post.save())
      .populate({ path: "createdBy" })
      .execPopulate();

    user.posts = user.posts.concat(savedPost._id);
    await user.save();

    response.status(200).json(savedPost);

  } catch (error) {
    next(error);
  }

};

const getUserFeed = async (request, response, next) => {

  try {
    const user = request.user;

    // Posts by the user and the people he/she is following
    const result = await Post.find({
      createdBy: {
        $in: [...user.following, user._id]
      }
    })
      .select("-__v")
      .lean()
      .populate({
        path: "createdBy",
        select: "-_id -__v -passwordHash"
      });

    const feedPosts = result.map((post) => {
      const isLiked = user.likedPosts.includes(post._id);

      const id = post._id.toString();
      delete post._id;

      return { ...post, isLiked, id };
    });

    return response.status(200).json(feedPosts);

  } catch (error) {
    next(error);
  }

};

const getUndiscoveredPosts = async (request, response, next) => {
  const user = request.user;

  try {
    const posts = await Post.find({
      createdBy: {
        $nin: [...user.following, user._id]
      }
    })
      .populate({
        path: "createdBy",
        select: "name username avatarUrl"
      });

    return response.status(200).json(posts);

  } catch (error) {
    next(error);
  }

};

const toggleLike = async (request, response, next) => {

  try {
    const id = request.params.id;
    const { isLiked } = request.body;

    const by = isLiked ? -1 : 1;

    const user = request.user;

    const updatedPost = await Post
      .findByIdAndUpdate(id, { $inc: { likes: by } }, { new: true })
      .populate({
        path: "createdBy"
      });

    if (isLiked) {
      user.likedPosts = user.likedPosts.filter(id => !id.equals(updatedPost._id));
      await user.save();
    } else {
      user.likedPosts = user.likedPosts.concat(updatedPost._id);
      await user.save();
    }

    return response.status(200).json(updatedPost);

  } catch (error) {
    next(error);
  }

};

const getPostDetails = async (request, response, next) => {
  const id = request.params.id;

  try {
    const post = await Post.findById(id)
      .populate({
        path: "createdBy"
      })
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "name username avatarUrl"
        }
      });

    return response.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addComment = async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  if (!body.comment.trim())
    return next({ statusCode: 400, message: "Comment can't be empty" });

  try {
    const post = await Post.findById(id);
    const comment = new Comment({
      date: new Date(),
      parentPost: post._id,
      createdBy: request.user._id,
      content: body.comment
    });

    const savedComment = await comment.save();
    post.comments = post.comments.concat(savedComment._id);

    const populatedPost = await (await post.save())
      .populate({
        path: "createdBy"
      })
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          select: "name username avatarUrl"
        }
      })
      .execPopulate();

    return response.status(201).json(populatedPost);

  } catch (error) {
    next(error);
  }

};


module.exports = {
  createPost,
  getUserFeed,
  getUndiscoveredPosts,
  toggleLike,
  getPostDetails,
  addComment
};