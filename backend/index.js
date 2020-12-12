require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const connectDB = require("./config/connectDB");

connectDB();
const app = express();

app.use(express.json());
app.use(morgan("tiny"));


app.use("/api/users", userRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});