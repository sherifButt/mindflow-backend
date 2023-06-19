


const jwtUtils = require('../../utils/jwtUtils');

/**
 * Logs in a user and returns a JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with JWT token.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwtUtils.generateToken(user._id);

    // Return the token
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Logs out a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
const logout = (req, res) => {
  try {
    // Perform any necessary logout actions

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error er logging out:', error);
    return res.status(500).json({ error: 'Internal server error' });
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
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;
    await user.save();

    return user;
  } catch (error) {
    throw new Error('Failed to reset password');
  }
};

module.exports = {
  login,
  logout,
  resetPassword,
};

