const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (request, response, next) => {
  let token;

  if (request.headers && request.headers.authorization.startsWith("Bearer")) {

    try {
      token = request.headers.authorization.split(" ")[1];

      if (!token) {
        console.log("running");
        return next({ statusCode: 401, message: "Invalid token, not authorized" });
      }

      const decoded = jwt.verify(token, process.env.SECRET);
      request.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      next(error);
    }

  }

};

module.exports = protect;