const errorHandler = require("../../utils/errorHandler");

/**
 * Middleware to handle errors
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const handleRouteError = (err, req, res, next) => {
  // Log the error
  console.error(err);

  // Handle the error using the error controller
  const errorResponse = errorHandler(err);

  // Set the status code and send the error response
  res.status(errorResponse.statusCode).json({
    error: errorResponse.message,
  });
};

module.exports = handleRouteError;