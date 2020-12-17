const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: {
    type: String
  }
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Comment", commentSchema);