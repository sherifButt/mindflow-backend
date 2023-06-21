const { sendEmail } = require('./sendEmail');
/** 
 * Handles errors and sends appropriate response. and send email to developer
 * @function errorHandler
 * @param {Error} err - The error object.
 */

const errorHandler = (err) => {

  // Log the error
  console.error(err);

  // Default error status and message
  let statusCode = 500;
  let message = 'Internal Server Error: '+err.message;

  // Check if the error has a status code and message
  if (err.statusCode && err.error) {
    statusCode = err.statusCode;
    message = err.error;
  }

  // Check if the error is a mongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'An account with that email already exists';
  }

  // Check if the error is a mongoDB validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  // Check if the error is a mongoDB cast error
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID';
  }

  // Check if the error is a JWT error
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  // Check if the error is a JWT expired error
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Expired token';
  }

  // send email to developer
  // sendEmail('sherif.butt@gmail.com','Error', 'and error has occurred');

  // return the error response
  return { statusCode, message }; 
};

module.exports = errorHandler ;
