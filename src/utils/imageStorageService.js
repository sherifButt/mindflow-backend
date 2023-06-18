


 * Utility functions for interacting with the image storage service.
 */

const AWS = require('aws-sdk');

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * Uploads an image to the image storage service.
 * @param {string} imageKey - The key/name of the image.
 * @param {string} imagePath - The local path of the image file.
 * @returns {Promise<string>} - The URL of the uploaded image.
 */
async function uploadImage(imageKey, imagePath) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageKey,
    Body: imagePath,
    ACL: 'public-read',
  };

  try {
    const { Location } = await s3.upload(params).promise();
    return Location;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Deletes an image from the image storage service.
 * @param {string} imageKey - The key/name of the image.
 * @returns {Promise<void>}
 */
async function deleteImage(imageKey) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageKey,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
}

module.exports = {
  uploadImage,
  deleteImage,
};

