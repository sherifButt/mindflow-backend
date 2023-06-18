



/**
 * Generates a JWT token for the provided payload.
 * @param {object} payload - The payload to be included in the token.
 * @param {string} secret - The secret key used to sign the token.
 * @param {number} expiresIn - The expiration time of the token in seconds.
 * @returns {string} - The generated JWT token.
 */
function generateToken(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Verifies the provided JWT token and returns the decoded payload.
 * @param {string} token - The JWT token to be verified.
 * @param {string} secret - The secret key used to verify the token.
 * @returns {object} - The decoded payload if the token is valid, otherwise throws an error.
 */
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = {
  generateToken,
  verifyToken,
};



