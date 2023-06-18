


const app = require('../app');
const { Diagram } = require('../models');

describe('Diagram Controller', () => {
  let diagramId;

  beforeAll(async () => {
    // Create a test diagram
    const diagram = await Diagram.create({
      name: 'Test Diagram',
      description: 'This is a test diagram',
    });
    diagramId = diagram.id;
  });

  afterAll(async () => {
    // Clean up test data
    await Diagram.destroy({ where: {} });
  });

  describe('POST /diagrams', () => {
    it('should create a new diagram', async () => {
      const res = await request(app)
        .post('/diagrams')
        .send({
          name: 'New Diagram',
          description: 'This is a new diagram',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual('New Diagram');
      expect(res.body.description).toEqual('This is a new diagram');
    });
  });

  describe('PUT /diagrams/:id', () => {
    it('should update an existing diagram', async () => {
      const res = await request(app)
        .put(`/diagrams/${diagramId}`)
        .send({
          name: 'Updated Diagram',
          description: 'This is an updated diagram',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual('Updated Diagram');
      expect(res.body.description).toEqual('This is an updated diagram');
    });

    it('should return 404 if diagram does not exist', async () => {
      const res = await request(app)
        .put('/diagrams/999')
        .send({
          name: 'Updated Diagram',
          description: 'This is an updated diagram',
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Diagram not found');
    });
  });

  describe('DELETE /diagrams/:id', () => {
    it('should delete an existing diagram', async () => {
      const res = await request(app).delete(`/diagrams/${diagramId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Diagram deleted successfully');
    });

    it('should return 404 if diagram does not exist', async () => {
      const res = await request(app).delete('/diagrams/999');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toEqual('Diagram not found');
    });
  });
});

