


import { createInstruction, getInstructionById, updateInstruction } from '../src/api/controllers/instructionController';

describe('Instruction Model', () => {
  describe('createInstruction', () => {
    it('should create a new instruction', () => {
      // Mock data
      const instructionData = {
        diagramId: '123',
        nodeId: '456',
        type: 'action',
        name: 'Test Instruction',
        description: 'This is a test instruction',
        parameters: { param1: 'value1', param2: 'value2' },
        priority: 1,
      };

      // Call the createInstruction function
      const createdInstruction = createInstruction(instructionData);

      // Assertion
      expect(createdInstruction).toBeDefined();
      expect(createdInstruction.diagramId).toBe(instructionData.diagramId);
      expect(createdInstruction.nodeId).toBe(instructionData.nodeId);
      expect(createdInstruction.type).toBe(instructionData.type);
      expect(createdInstruction.name).toBe(instructionData.name);
      expect(createdInstruction.description).toBe(instructionData.description);
      expect(createdInstruction.parameters).toEqual(instructionData.parameters);
      expect(createdInstruction.priority).toBe(instructionData.priority);
    });
  });

  describe('getInstructionById', () => {
    it('should get an instruction by ID', () => {
      // Mock data
      const instructionId = '123';

      // Call the getInstructionById function
      const instruction = getInstructionById(instructionId);

      // Assertion
      expect(instruction).toBeDefined();
      expect(instruction.id).toBe(instructionId);
    });

    it('should return null if instruction is not found', () => {
      // Mock data
      const instructionId = '999';

      // Call the getInstructionById function
      const instruction = getInstructionById(instructionId);

      // Assertion
      expect(instruction).toBeNull();
    });
  });

  describe('updateInstruction', () => {
    it('should update an instruction', () => {
      // Mock data
      const instructionId = '123';
      const updatedInstructionData = {
        name: 'Updated Instruction',
        description: 'This is an updated instruction',
        parameters: { param1: 'updatedValue1', param2: 'updatedValue2' },
      };

      // Call the updateInstruction function
      const updatedInstruction = updateInstruction(instructionId, updatedInstructionData);

      // Assertion
      expect(updatedInstruction).toBeDefined();
      expect(updatedInstruction.id).toBe(instructionId);
      expect(updatedInstruction.name).toBe(updatedInstructionData.name);
      expect(updatedInstruction.description).toBe(updatedInstructionData.description);
      expect(updatedInstruction.parameters).toEqual(updatedInstructionData.parameters);
    });

    it('should return null if instruction is not found', () => {
      // Mock data
      const instructionId = '999';
      const updatedInstructionData = {
        name: 'Updated Instruction',
        description: 'This is an updated instruction',
        parameters: { param1: 'updatedValue1', param2: 'updatedValue2' },
      };

      // Call the updateInstruction function
      const updatedInstruction = updateInstruction(instructionId, updatedInstructionData);

      // Assertion
      expect(updatedInstruction).toBeNull();
    });
  });
});

