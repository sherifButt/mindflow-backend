


const app = require('../app');
const db = require('../db');

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.disconnect();
});

describe('Instruction Controller', () => {
  let instructionId;

  it('should create a new instruction', async () => {
    const response = await request(app)
      .post('/api/instructions')
      .send({
        diagramId: '123',
        type: 'node',
        name: 'Create Node',
        description: 'Create a new node',
        parameters: { x: 100, y: 200 },
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    instructionId = response.body.id;
  });

  it('should get a specific instruction', async () => {
    const response = await request(app).get(`/api/instructions/${instructionId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', instructionId);
  });

  it('should update an existing instruction', async () => {
    const response = await request(app)
      .put(`/api/instructions/${instructionId}`)
      .send({
        name: 'Update Node',
        description: 'Update an existing node',
        parameters: { x: 300, y: 400 },
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', instructionId);
    expect(response.body).toHaveProperty('name', 'Update Node');
    expect(response.body).toHaveProperty('description', 'Update an existing node');
    expect(response.body).toHaveProperty('parameters', { x: 300, y: 400 });
  });

  it('should delete an existing instruction', async () => {
    const response = await request(app).delete(`/api/instructions/${instructionId}`);

    expect(response.statusCode).toBe(204);
  });
});

