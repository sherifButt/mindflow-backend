const jwtUtils = require('../utils/jwtUtils');
/**
 * Middleware function to verify the JWT token in the request headers.
 * If the token is valid, it sets the user object in the request and calls the next middleware.
 * If the token is invalid or missing, it sends a 401 Unauthorized response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwtUtils.verifyToken(token);

    if(!decoded) return res.status(403).json({ message: 'Forbidden' });

    // Set the user object in the request
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (err) {
    next(err)
  }
};

module.exports = verifyToken;