const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  joined: {
    type: Date
  },
  avatarUrl: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  passwordHash: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  about: {
    type: String,
    default: ""
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  likedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

userSchema.plugin(uniqueValidator, { message: "{PATH} needs to be unique" });

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model("User", userSchema);