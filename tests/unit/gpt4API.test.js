


import { getInstructions, createInstruction, deleteInstruction } from '../src/api/services/gpt4API';

describe('GPT-4 API Tests', () => {
  // Mock data
  const mockInstruction = {
    id: 1,
    name: 'Test Instruction',
    description: 'This is a test instruction',
    parameters: { param1: 'value1', param2: 'value2' },
  };

  // Test getInstructions method
  describe('getInstructions', () => {
    it('should return an array of instructions', async () => {
      const instructions = await getInstructions();
      expect(Array.isArray(instructions)).toBe(true);
    });

    it('should return instructions with valid properties', async () => {
      const instructions = await getInstructions();
      expect(instructions[0]).toHaveProperty('id');
      expect(instructions[0]).toHaveProperty('name');
      expect(instructions[0]).toHaveProperty('description');
      expect(instructions[0]).toHaveProperty('parameters');
    });
  });

  // Test createInstruction method
  describe('createInstruction', () => {
    it('should create a new instruction', async () => {
      const createdInstruction = await createInstruction(mockInstruction);
      expect(createdInstruction).toHaveProperty('id');
      expect(createdInstruction.name).toBe(mockInstruction.name);
      expect(createdInstruction.description).toBe(mockInstruction.description);
      expect(createdInstruction.parameters).toEqual(mockInstruction.parameters);
    });
  });

  // Test deleteInstruction method
  describe('deleteInstruction', () => {
    it('should delete an existing instruction', async () => {
      const deletedInstruction = await deleteInstruction(mockInstruction.id);
      expect(deletedInstruction).toHaveProperty('id');
      expect(deletedInstruction.name).toBe(mockInstruction.name);
      expect(deletedInstruction.description).toBe(mockInstruction.description);
      expect(deletedInstruction.parameters).toEqual(mockInstruction.parameters);
    });
  });
});

