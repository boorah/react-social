const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log("connected to the database!");

  } catch(error) {
    console.log("error occured while connecting to the database!");
  }
};

module.exports = connectDB;