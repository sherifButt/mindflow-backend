const gpt4API = require('../../utils/gpt4API')

/**
 * Creates a new diagram.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created diagram.
 */
const createDiagram = async (req, res) => {
   try {
     const { diagramData, userId } = req.body;
 
     const query = {
       text: 'INSERT INTO diagrams(diagram_data, name, slug, description, created_at, updated_at, created_by, sharing_settings) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $5, $6) RETURNING *',
       values: [JSON.stringify(diagramData.data), diagramData.name, diagramData.slug, diagramData.description, userId, diagramData.sharing_settings],
     };
 
     const result = await pool.query(query);
     const diagram = result.rows[0];
 
     return res.status(201).json(diagram);
   } catch (error) {
     console.error('Error creating diagram:', error);
     return res.status(500).json({ error: 'Failed to create diagram' });
   }
 };

/**
 * Retrieves a diagram by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The retrieved diagram.
 */
const getDiagramById = async (req, res) => {
   try {
      const { diagramId } = req.params
      const diagram = await diagramModel.getDiagramById(diagramId)
      if (!diagram) {
         return res.status(404).json({ error: 'Diagram not found' })
      }
      return res.json(diagram)
   } catch (error) {
      console.error('Error retrieving diagram:', error)
      return res.status(500).json({ error: 'Failed to retrieve diagram' })
   }
}

/**
 * Updates a diagram by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated diagram.
 */
const updateDiagramById = async (req, res) => {
   try {
      const { diagramId } = req.params
      const { diagramData } = req.body
      const diagram = await diagramModel.updateDiagramById(diagramId, diagramData)
      if (!diagram) {
         return res.status(404).json({ error: 'Diagram not found' })
      }
      return res.json(diagram)
   } catch (error) {
      console.error('Error updating diagram:', error)
      return res.status(500).json({ error: 'Failed to update diagram' })
   }
}

/**
 * Deletes a diagram by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The deleted diagram.
 */
const deleteDiagramById = async (req, res) => {
   try {
      const { diagramId } = req.params
      const diagram = await diagramModel.deleteDiagramById(diagramId)
      if (!diagram) {
         return res.status(404).json({ error: 'Diagram not found' })
      }
      return res.json(diagram)
   } catch (error) {
      console.error('Error deleting diagram:', error)
      return res.status(500).json({ error: 'Failed to delete diagram' })
   }
}

module.exports = {
   createDiagram,
   getDiagramById,
   updateDiagramById,
   deleteDiagramById,
}
