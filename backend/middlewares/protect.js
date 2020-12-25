const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (request, response, next) => {
  let token;

  if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
    try {
      token = request.headers.authorization.split(" ")[1];
      
      if (!token)
        return next({ statusCode: 401, message: "Invalid token, not authorized" });


      const decoded = jwt.verify(token, process.env.SECRET);

      request.user = await User.findById(decoded.id);

      // if the token is valid but there's no user with that details
      if (!request.user) {
        return next({ statusCode: 401, message: "Invalid token, not authorized" });
      }

      next();
    } catch (error) {
      next(error);
    }

  }

  if (!token)
    return next({ statusCode: 401, message: "Invalid token, not authorized" });

};

module.exports = protect;