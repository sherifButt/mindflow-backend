const express = require('express')
const router = express.Router();
const diagramInstructionsController = require('../controllers/diagramInstructionController');

/**
 * @swagger
 * tags:
 *   name: Instructions
 *   description: API endpoints for instructions
 */

/**
 * @swagger
 * /instruction/create:
 *   post:
 *     summary: Create a new instruction
 *     tags: [Instructions]
 *     parameters:
 *       - in: body
 *         name: instruction
 *         description: The instruction to create
 *         schema:
 *           type: object
 *           properties:
 *             diagram_id:
 *               type: integer
 *             node_id:
 *               type: string
 *             type:
 *               type: string
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             parameters:
 *               type: object
 *             priority:
 *               type: integer
 *     responses:
 *       200:
 *         description: The created instruction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instruction'
 */
router.post('/', diagramInstructionsController.createDiagramInstruction);

/**
 * @swagger
 * /instruction/{id}:
 *   get:
 *     summary: Get an instruction by ID
 *     tags: [Instructions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the instruction
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The instruction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instruction'
 *       404:
 *         description: Instruction not found
 *   put:
 *     summary: Update an instruction
 *     tags: [Instructions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the instruction
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: instruction
 *         description: The updated instruction
 *         schema:
 *           type: object
 *           properties:
 *             diagram_id:
 *               type: integer
 *             node_id:
 *               type: string
 *             type:
 *               type: string
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             parameters:
 *               type: object
 *             priority:
 *               type: integer
 *     responses:
 *       200:
 *         description: The updated instruction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instruction'
 *       404:
 *         description: Instruction not found
 *   delete:
 *     summary: Delete an instruction
 *     tags: [Instructions]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the instruction
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Instruction deleted
 *       404:
 *         description: Instruction not found
 */
router.get('/', diagramInstructionsController.getAllDiagramInstructions);
router.get('/:id', diagramInstructionsController.getDiagramInstructionById);
router.put('/:id', diagramInstructionsController.updateDiagramInstructionById);
router.delete('/:id', diagramInstructionsController.deleteDiagramInstructionById);
 
module.exports = router;