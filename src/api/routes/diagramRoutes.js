


const router = express.Router();
const diagramController = require('../controllers/diagramController');

/**
 * @swagger
 * tags:
 *   name: Diagrams
 *   description: API endpoints for diagrams
 */

/**
 * @swagger
 * /diagram/create:
 *   post:
 *     summary: Create a new diagram
 *     tags: [Diagrams]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagramData:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               diagramData: "..."
 *               name: "My Diagram"
 *               description: "This is my diagram"
 *     responses:
 *       200:
 *         description: Diagram created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                 diagramData:
 *                   type: object
 *                   description: Created diagram data
 *             example:
 *               status: "success"
 *               diagramData: { id: 1, diagramData: "...", name: "My Diagram", description: "This is my diagram" }
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/diagram/create', diagramController.createDiagram);

/**
 * @swagger
 * /diagram/{id}:
 *   get:
 *     summary: Get a diagram by ID
 *     tags: [Diagrams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the diagram
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Diagram retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                 diagramData:
 *                   type: object
 *                   description: Retrieved diagram data
 *             example:
 *               status: "success"
 *               diagramData: { id: 1, diagramData: "...", name: "My Diagram", description: "This is my diagram" }
 *       404:
 *         description: Diagram not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a diagram by ID
 *     tags: [Diagrams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the diagram
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagramData:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               diagramData: "..."
 *               name: "Updated Diagram"
 *               description: "This is an updated diagram"
 *     responses:
 *       200:
 *         description: Diagram updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *                 diagramData:
 *                   type: object
 *                   description: Updated diagram data
 *             example:
 *               status: "success"
 *               diagramData: { id: 1, diagramData: "...", name: "Updated Diagram", description: "This is an updated diagram" }
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Diagram not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a diagram by ID
 *     tags: [Diagrams]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the diagram
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Diagram deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status message
 *       404:
 *         description: Diagram not found
 *       500:
 *         description: Internal server error
 */
router.get('/diagram/:id', diagramController.getDiagramById);
router.put('/diagram/:id', diagramController.updateDiagramById);
router.delete('/diagram/:id', diagramController.deleteDiagramById);

module.exports = router;

