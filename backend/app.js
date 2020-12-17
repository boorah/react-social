require("dotenv").config();
const config = require("./utils/config");
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const errorHandler = require("./middlewares/errorHandler");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const connectDB = require("./utils/connectDB");

connectDB(config.MONGO_URI);
const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "test")
  app.use(morgan("tiny"));


app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;