const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (request, response, next) => {
  try {
    const body = request.body;

    // If there's no password field
    if (!body.password)
      return response.status(400).json({
        message: "Password is required"
      });

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
  } catch (err) {
    next(err);
  }
};

const authUser = async (request, response, next) => {
  try {
    const body = request.body;

    // Find the user with the given email
    const user = await User.findOne({email: body.email});

    // If the user doesn't exists
    if (!user)
      return response.status(404).json({message: "user doesn't exists"});
    
    const passwordMatch = await bcrypt.compare(body.password, user.passwordHash);

    // If the password doesn't match
    if (!passwordMatch)
      return response.status(401).json({message: "invalid password"});
    
    // Generate token

    const tokenUser = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(tokenUser, process.env.SECRET);

    response.status(200).json({
      token,
      user
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, authUser };