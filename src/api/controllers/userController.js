



/**
 * Registers a new user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the registered user object.
 */
const register = async (email, password) => {
  try {
    const user = await UserModel.create({ email, password });
    return user;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

/**
 * Logs in a user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the logged-in user object.
 */
const login = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  } catch (error) {
    throw new Error('Failed to login user');
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
  register,
  login,
  resetPassword,
};

