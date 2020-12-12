const unknownEndpoint = (request, response) => {
  response.status(404).send("<div>Not found!</div>");
};

module.exports = unknownEndpoint;