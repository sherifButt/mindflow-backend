



/**
 * Create a new instruction
 * @param {Object} instructionData - The data for the new instruction
 * @returns {Promise<Object>} - The created instruction
 */
const createInstruction = async (instructionData) => {
  try {
    const instruction = await Instruction.create(instructionData);
    return instruction;
  } catch (error) {
    throw new Error('Failed to create instruction');
  }
};

/**
 * Get an instruction by ID
 * @param {string} instructionId - The ID of the instruction to retrieve
 * @returns {Promise<Object>} - The retrieved instruction
 */
const getInstruction = async (instructionId) => {
  try {
    const instruction = await Instruction.findById(instructionId);
    if (!instruction) {
      throw new Error('Instruction not found');
    }
    return instruction;
  } catch (error) {
    throw new Error('Failed to get instruction');
  }
};

/**
 * Update an instruction
 * @param {string} instructionId - The ID of the instruction to update
 * @param {Object} instructionData - The updated data for the instruction
 * @returns {Promise<Object>} - The updated instruction
 */
const updateInstruction = async (instructionId, instructionData) => {
  try {
    const instruction = await Instruction.findByIdAndUpdate(
      instructionId,
      instructionData,
      { new: true }
    );
    if (!instruction) {
      throw new Error('Instruction not found');
    }
    return instruction;
  } catch (error) {
    throw new Error('Failed to update instruction');
  }
};

/**
 * Delete an instruction
 * @param {string} instructionId - The ID of the instruction to delete
 * @returns {Promise<void>}
 */
const deleteInstruction = async (instructionId) => {
  try {
    const instruction = await Instruction.findByIdAndDelete(instructionId);
    if (!instruction) {
      throw new Error('Instruction not found');
    }
  } catch (error) {
    throw new Error('Failed to delete instruction');
  }
};

module.exports = {
  createInstruction,
  getInstruction,
  updateInstruction,
  deleteInstruction,
};

