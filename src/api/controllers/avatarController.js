const AvatarAPI = require('../../services/avatarAPI');

/**
 * Creates an avatar for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created avatar object.
 */
const createAvatar = async (req, res) => {
  try {
    const { userId, description } = req.body;

    // Generate avatar using the Avatar API
    const avatarData = await AvatarAPI.generateAvatar(description);

    // Save the avatar data in the database
    const avatar = await AvatarModel.create({
      userId,
      image: avatarData.image,
      createdAt: new Date(),
    });

    return res.status(201).json(avatar);
  } catch (error) {
    console.error('Error creating avatar:', error);
    return res.status(500).json({ error: 'Failed to create avatar' });
  }
};

/**
 * Retrieves the avatar for a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The avatar object.
 */
const getAvatarById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the avatar for the user
    const avatar = await AvatarModel.findOne({ userId });

    if (!avatar) {
      return res.status(404).json({ error: 'Avatar not found' });
    }

    return res.json(avatar);
  } catch (error) {
    console.error('Error retrieving avatar:', error);
    return res.status(500).json({ error: 'Failed to retrieve avatar' });
  }
};

module.exports = {
  createAvatar,
  getAvatarById,
};

