const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (request, response, next) => {
  try {
    const body = request.body;

    // remove spaces
    body.password = body.password.trim();

    // If there's no password field
    if (!body.password)
      return next({ statusCode: 400, message: "Password is required" });

    // Generate password hash
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    // Create new user object
    const user = new User({
      joined: new Date(),
      name: body.name,
      username: body.username,
      passwordHash,
      email: body.email
    });

    // Save the user to the database
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (request, response, next) => {
  const user = request.user;
  const { avatarUrl, password, about } = request.body;

  try {
    if (password && password.trim()) {
      const saltRounds = 10;
      user.passwordHash = await bcrypt.hash(password.trim(), saltRounds);

      await user.save();
    }

    if (avatarUrl) {
      user.avatarUrl = avatarUrl;

      await user.save();
    }

    if (about && about.trim()) {
      user.about = about.trim();

      await user.save();
    }

    return response.status(200).end();

  } catch (error) {
    next(error);
  }

};

const authUser = async (request, response, next) => {
  try {
    const body = request.body;

    // remove spaces
    body.password = body.password.trim();

    if (!body.password)
      return next({ statusCode: 400, message: "Password is required" });

    // Find the user with the given email
    const user = await User.findOne({ email: body.email }).select("-followers -following");

    // If the user doesn't exists
    if (!user)
      return next({ statusCode: 404, message: "User doesn't exist" });

    const passwordMatch = await bcrypt.compare(body.password, user.passwordHash);

    // If the password doesn't match
    if (!passwordMatch)
      return next({ statusCode: 401, message: "Invalid password" });

    // Generate token

    const tokenUser = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(tokenUser, process.env.SECRET);

    response.status(200).json({
      token,
      details: {
        name: user.name,
        avatarUrl: user.avatarUrl,
        username: user.username,
      }
    });

  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (request, response, next) => {
  const { username } = request.params;

  try {
    let user = await User.findOne({ username })
      .select("-likedPosts -passwordHash -__v")
      .lean();

    const id = user._id.toString();
    const isMe = request.user._id.equals(user._id);
    const isFollowing = request.user.following.includes(user._id);
    delete user._id;

    user = {
      ...user,
      id,
      isMe,
      isFollowing
    };

    return response.status(200).json(user);

  } catch (error) {
    next(error);
  }

};

const getUsersToFollow = async (request, response, next) => {
  const user = request.user;

  try {
    const users = await User.find({
      _id: {
        $nin: [...user.following, user._id]
      }
    })
      .lean()
      .select("name username about avatarUrl");

    const updatedUsers = users.map(
      user => {
        const id = user._id.toString();
        delete user._id;

        return ({
          ...user,
          id,
          isFollowing: false,
        });
      }
    );

    return response.status(200).json(updatedUsers);
  } catch (error) {
    next(error);
  }

};

const toggleFollow = async (request, response, next) => {
  const id = request.params.id;
  const user = request.user;
  const { isFollowing } = request.body;

  try {
    const userToFollow = await User.findById(id);

    if (!isFollowing) {
      user.following = user.following.concat(userToFollow._id);
      await user.save();

      userToFollow.followers = userToFollow.followers.concat(user._id);
      await userToFollow.save();
    } else {
      user.following = user.following.filter(u => !u._id.equals(userToFollow._id));
      await user.save();

      userToFollow.followers = userToFollow.followers.filter(u => !u._id.equals(user._id));
      await userToFollow.save();
    }

    return response.status(200).end();

  } catch (error) {
    next(error);
  }

};

const getUserFollowing = async (request, response, next) => {
  const user = request.user;
  const username = request.params.username;

  try {
    let { following } = await User.findOne({ username })
      .select("following")
      .populate({
        path: "following",
        select: "name username about avatarUrl"
      })
      .lean();

    following = following.map(
      f => {
        const isFollowing = user.following.includes(f._id);
        const isMe = user._id.equals(f._id);
        const id = f._id.toString();
        delete f._id;

        return {
          ...f,
          id,
          isMe,
          isFollowing
        };
      }
    );

    return response.status(200).json(following);
  } catch (error) {
    next(error);
  }
};

const getUserFollowers = async (request, response, next) => {
  const user = request.user;
  const username = request.params.username;

  try {
    let { followers } = await User.findOne({ username })
      .select("followers")
      .populate({
        path: "followers",
        select: "name username about avatarUrl"
      })
      .lean();

    followers = followers.map(
      f => {
        const isFollowing = user.following.includes(f._id);
        const isMe = user._id.equals(f._id);
        const id = f._id.toString();
        delete f._id;

        return {
          ...f,
          id,
          isMe,
          isFollowing
        };
      }
    );

    return response.status(200).json(followers);
  } catch (error) {
    next(error);
  }
};

const getLikedPosts = async (request, response, next) => {
  const user = request.user;
  const username = request.params.username;

  try {
    let { likedPosts } = await User.findOne({ username })
      .select("likedPosts")
      .populate({
        path: "likedPosts",
        populate: {
          path: "createdBy",
          select: "name username avatarUrl -_id"
        }
      })
      .lean();

    likedPosts = likedPosts.map(
      post => {
        const id = post._id.toString();
        const isLiked = user.likedPosts.includes(post._id);
        delete post._id;
        delete post.__v;

        return {
          ...post,
          id,
          isLiked
        };
      }
    );

    return response.status(200).json(likedPosts);

  } catch (error) {
    next(error);
  }
};

const getUserPosts = async (request, response, next) => {
  const user = request.user;
  const username = request.params.username;

  try {
    let { posts } = await User.findOne({ username })
      .select("posts")
      .populate({
        path: "posts",
        populate: {
          path: "createdBy",
          select: "name username avatarUrl -_id"
        }
      })
      .lean();

    posts = posts.map(
      post => {
        const id = post._id.toString();
        const isLiked = user.likedPosts.includes(post._id);
        delete post._id;
        delete post.__v;

        return {
          ...post,
          id,
          isLiked
        };
      }
    );

    return response.status(200).json(posts);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  authUser,
  getUserDetails,
  getUsersToFollow,
  toggleFollow,
  getUserFollowing,
  getUserFollowers,
  getLikedPosts,
  getUserPosts
};