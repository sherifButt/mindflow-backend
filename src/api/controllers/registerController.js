


const jwtUtils = require('../../utils/jwtUtils');

/**
 * Handles user registration.
 */
const postRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new UserModel({ email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwtUtils.generateToken(newUser._id);

    // Return the token
    res.json({ token });
  } catch (error) {
    console.error('Error in postRegister:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  postRegister,
};

