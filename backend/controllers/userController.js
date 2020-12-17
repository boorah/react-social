const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (request, response, next) => {
  try {
    const body = request.body;

    // If there's no password field
    if (!body.password)
      return next({ statusCode: 400, message: "Password is required" });

    // Generate password hash
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    // Create new user object
    const user = new User({
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

const authUser = async (request, response, next) => {
  try {
    const body = request.body;

    // Find the user with the given email
    const user = await User.findOne({email: body.email}).select("-followers -following");

    // If the user doesn't exists
    if (!user)
      return next({statusCode: 404, message: "User doesn't exist"});
    
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
      details: user
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, authUser };