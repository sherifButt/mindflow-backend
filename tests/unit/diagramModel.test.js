


import { createDiagram, getDiagramById, updateDiagram } from '../src/api/controllers/diagramController';

describe('Diagram Model', () => {
  describe('createDiagram', () => {
    it('should create a new diagram', async () => {
      const diagramData = {
        name: 'Test Diagram',
        description: 'This is a test diagram',
        createdBy: 'user123',
      };

      const createdDiagram = await createDiagram(diagramData);

      expect(createdDiagram).toBeDefined();
      expect(createdDiagram.name).toBe(diagramData.name);
      expect(createdDiagram.description).toBe(diagramData.description);
      expect(createdDiagram.createdBy).toBe(diagramData.createdBy);
    });
  });

  describe('getDiagramById', () => {
    it('should get a diagram by its ID', async () => {
      const diagramId = '123456789';

      const diagram = await getDiagramById(diagramId);

      expect(diagram).toBeDefined();
      expect(diagram.id).toBe(diagramId);
    });

    it('should return null if diagram is not found', async () => {
      const diagramId = '987654321';

      const diagram = await getDiagramById(diagramId);

      expect(diagram).toBeNull();
    });
  });

  describe('updateDiagram', () => {
    it('should update a diagram', async () => {
      const diagramId = '123456789';
      const updatedData = {
        name: 'Updated Diagram',
        description: 'This is an updated diagram',
      };

      const updatedDiagram = await updateDiagram(diagramId, updatedData);

      expect(updatedDiagram).toBeDefined();
      expect(updatedDiagram.id).toBe(diagramId);
      expect(updatedDiagram.name).toBe(updatedData.name);
      expect(updatedDiagram.description).toBe(updatedData.description);
    });

    it('should return null if diagram is not found', async () => {
      const diagramId = '987654321';
      const updatedData = {
        name: 'Updated Diagram',
        description: 'This is an updated diagram',
      };

      const updatedDiagram = await updateDiagram(diagramId, updatedData);

      expect(updatedDiagram).toBeNull();
    });
  });
});

