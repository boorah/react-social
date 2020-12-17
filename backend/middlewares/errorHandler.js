const errorHandler = (error, request, response, next) => {
  
  const statusCode = error.statusCode || 500;

  if (error.name === "CastError")
    return response.status(400).json(error.message);

  if (error.name === "ValidationError")
    return response.status(400).json(error.message);
  
  if (error.name === "JsonWebTokenError")
    return response.status(400).json(error.message);
  
  response.status(statusCode).json({ message: error.message });
};

module.exports = errorHandler;