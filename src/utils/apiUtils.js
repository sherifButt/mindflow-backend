/**
 * Utility functions for handling API requests and responses.
 */

/**
 * Handles successful API response.
 * @param {object} response - The API response object.
 * @returns {Promise} - Resolves with the response data.
 */
export const handleSuccess = async (response) => {
  try {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error('Failed to parse response');
  }
};

/**
 * Handles API failure response.
 * @param {object} error - The API error object.
 * @returns {Promise} - Rejects with the error message.
 */
export const handleFailure = async (error) => {
  let errorMessage = 'An error occurred';
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  throw new Error(errorMessage);
};