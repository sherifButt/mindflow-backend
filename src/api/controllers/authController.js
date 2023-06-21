const jwtUtils = require('../../utils/jwtUtils');
const { pool } = require('../../config/db');
const validator = require('../../utils/validator')
const bcrypt = require('bcrypt');

/**
 * Logs in a user and returns a JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with JWT token.
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if email and password are provided
    if (!email || !password) throw { error: 'Email and password are required', statusCode: 400 };

    // Check if the user exists
    const row = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = row.rows[0];
    if (!user) throw { error: 'User not found', statusCode: 404 };

    // Check if the password is correct
    const match = await bcrypt.compare(password,user.password);
    if (!match) throw { error: 'Invalid password', statusCode: 400 };

    // Generate JWT token
    // const token = jwtUtils.generateToken(user.user_id);
    const token = jwtUtils.generateToken({ userId: user.user_id, email: user.email });
    // store the token in the database
    await pool.query('UPDATE users SET jwt=$1 WHERE user_id = $2', [token, user.user_id])

    // Return the token
    return res.status(200).json({ token });
  } catch (error) {
    // console.error('Error logging in:', error.message);
    next(error);
  }
}

/**
 * Logs out a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
const logout = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Check if there is a token
    if (!token) throw { error: 'Unauthorized', statusCode: 401 };

    // Verify the token
    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) throw { error: 'Forbidden', statusCode: 403 };


    // Delete the token from the database
    const result = await pool.query('UPDATE users SET jwt = NULL WHERE jwt = $1', [token]);
    
    // if no token was found in the database, return 401 Unauthorized
    if (result.rowCount === 0) {
      throw { error: 'Unauthorized', statusCode: 401 };
    }

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error)
  }
};

/**
 * Resets the password for a user.
 * @param {string} email - The email of the user.
 * @param {string} newPassword - The new password for the user.
 * @returns {Promise<Object>} - A promise that resolves to the updated user object.
 */
const resetPassword = async (email, newPassword) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!user)
      throw { error: 'User not found', statusCode: 404 };


    user.password = newPassword;
    await pool.query('UPDATE users SET password = $1 WHERE email = $2', [user.password, email]);

    return user;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw { error: 'Failed to reset password', statusCode: 500 };
  }
};

// register a new user and return a JWT token in the response body if successful 
const register = async (req, res, next) => {
  const { username, email, password,confirmPassword } = req.body;

  try {
    // check if email and password are provided
    if (!username || !email || !password) throw { error: 'Username, Email, password and confirm password are required', statusCode: 400 };

    // check if username is valid
    if (!validator.isUsername(username)) throw { error: 'Invalid username, username must be at least 3 characters long and contain only letters and numbers', statusCode: 400 };

    // check if email is valid
    if (!validator.isEmail(email)) throw { error: 'Invalid email', statusCode: 400 };

    // check if password is valid
    if (!validator.isStrongPassword(password)) throw { error: 'Invalid password, password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol', statusCode: 400 };

    // check if password and confirm password match
    if (password !== confirmPassword) throw { error: 'Password and confirm password do not match', statusCode: 400 };

    // check if user already exists
    const rows = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {

      throw { error: 'user [${email}] already exists, chose a different user!', statusCode: 409 };
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    // create a new user
    const query = {
      text: 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
      values: [username, email, hashedPassword],
    };

   const result =  await pool.query(query);

    // generate JWT token
    const user = result.rows[0];
    const token = jwtUtils.generateToken({ userId: user.user_id, email: user.email });

    // store the token in the database
    await pool.query('UPDATE users SET jwt=$1 WHERE user_id = $2', [token, user.user_id])

    // Send the token in the response
    res.status(201).json({ token, userId: user.user_id });

  } catch (error) {
    // console.error('Error registering user:', error.message); 
    next(error);
  }
};



module.exports = {
  login,
  logout,
  resetPassword,
  register,
};