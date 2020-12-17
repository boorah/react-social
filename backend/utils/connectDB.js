const mongoose = require("mongoose");

const connectDB = async (URI) => {
  try {

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    
    if (process.env.NODE_ENV !== "test")
      console.log("connected to the database!");

  } catch(error) {
    console.log("error occured while connecting to the database!", error);
  }
};

module.exports = connectDB;