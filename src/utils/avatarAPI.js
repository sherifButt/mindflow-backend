/**
 * Generates an avatar image based on the provided description.
 * @param {string} description - The description for generating the avatar.
 * @returns {Promise<string>} - The URL of the generated avatar image.
 */
async function generateAvatar(description) {
  try {
    const response = await axios.post('https://example.com/avatar', { description });
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error generating avatar:', error);
    throw new Error('Failed to generate avatar');
  }
}

module.exports = {
  generateAvatar,
};