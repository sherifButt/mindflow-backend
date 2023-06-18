


const router = express.Router();
const jobController = require('../controllers/jobController');

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API endpoints for job actions
 */

/**
 * @swagger
 * /job/create:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instructionId:
 *                 type: integer
 *             example:
 *               instructionId: 1
 *     responses:
 *       200:
 *         description: Job created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/job/create', jobController.createJob);

/**
 * @swagger
 * /job/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job found
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instructionId:
 *                 type: integer
 *             example:
 *               instructionId: 2
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.get('/job/:id', jobController.getJobById);
router.put('/job/:id', jobController.updateJobById);
router.delete('/job/:id', jobController.deleteJobById);

module.exports = router;

