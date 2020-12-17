const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
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
  likedPosts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
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