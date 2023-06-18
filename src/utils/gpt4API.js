/**
 * Generates instructions using the GPT-4 API.
 * @param {string} prompt - The prompt for generating instructions.
 * @returns {Promise<string>} - The generated instructions.
 */
async function generateInstructions(prompt) {
  try {
    const response = await axios.post('https://gpt4-api.com/instructions', { prompt });
    return response.data.instructions;
  } catch (error) {
    console.error('Error generating instructions:', error);
    throw new Error('Failed to generate instructions');
  }
}

/**
 * Generates a diagram using the GPT-4 API.
 * @param {string} prompt - The prompt for generating the diagram.
 * @returns {Promise<string>} - The generated diagram.
 */
async function generateDiagram(prompt) {
  try {
    const response = await axios.post('https://gpt4-api.com/diagram', { prompt });
    return response.data.diagram;
  } catch (error) {
    console.error('Error generating diagram:', error);
    throw new Error('Failed to generate diagram');
  }
}

/**
 * Generates a sequence diagram using the GPT-4 API.
 * @param {string} prompt - The prompt for generating the sequence diagram.
 * @returns {Promise<string>} - The generated sequence diagram.
 */
async function generateSequenceDiagram(prompt) {
  try {
    const response = await axios.post('https://gpt4-api.com/sequence-diagram', { prompt });
    return response.data.sequenceDiagram;
  } catch (error) {
    console.error('Error generating sequence diagram:', error);
    throw new Error('Failed to generate sequence diagram');
  }
}

module.exports = {
  generateInstructions,
  generateDiagram,
  generateSequenceDiagram,
};

