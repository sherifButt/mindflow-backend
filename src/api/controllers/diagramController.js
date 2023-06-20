const { pool } = require('../../config/db');
const gpt4API = require('../../utils/gpt4API')


/**
 * Creates a new diagram.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created diagram.
 */
const createDiagram = async (req, res, next) => {
   try {
      const { diagramData, userId } = req.body;

      if (!diagramData || !diagramData.data || !diagramData.name || !diagramData.slug || !diagramData.description || !diagramData.sharing_settings) throw { message: 'Diagram data, name, slug, description, and sharing settings are required', statusCode: 400 };
      if (!userId || !diagramData.created_by) throw { message: 'User ID is required', statusCode: 400 };

      const query = {
         text: 'INSERT INTO diagrams(diagram_data, name, slug, description, created_at, updated_at, created_by, sharing_settings) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $5, $6) RETURNING *',
         values: [JSON.stringify(diagramData.data), diagramData.name, diagramData.slug, diagramData.description, userId, diagramData.sharing_settings],
      };

      const result = await pool.query(query);
      const diagram = result.rows[0];
      diagram.diagram_data = JSON.parse(diagram.diagram_data);

      return res.status(201).json(diagram);
   } catch (error) {
      next(error);
   }
};

/**
 * Retrieves a diagram by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The retrieved diagram.
 */
const getDiagramById = async (req, res, next) => {
   try {
      const { id } = req.params
      if (!id) throw { message: 'Diagram ID is required', statusCode: 400 };

      const query = {
         text: 'SELECT * FROM diagrams WHERE id = $1',
         values: [id],
      };

      const result = await pool.query(query);
      const diagram = result.rows[0];
      if (!diagram) throw { message: 'Diagram not found', statusCode: 404 };

      diagram.diagram_data = JSON.parse(diagram.diagram_data);

      res.status(200).json(diagram);


   } catch (error) {
      next(error);
   }
}
/**
 * Retrieves all diagrams.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The retrieved diagram.
 */
const getAllDiagrams = async (req, res, next) => {
   try {
      const result = await pool.query('SELECT * FROM diagrams');
      const diagrams = result.rows;
      if (!diagrams) throw { message: 'Diagram not found', statusCode: 404 };
      diagrams.map(diagram => diagram.diagram_data = JSON.parse(diagram.diagram_data))
      res.status(200).json(diagrams);
   } catch (error) {
      next(error);
   }
}

/**
 * Updates a diagram by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated diagram.
 */
const updateDiagramById = async (req, res, next) => {
   try {
      const { id, diagram_data, name, slug, description, created_by, sharing_settings } = req.body;
     
      if (!id) throw { message: 'Diagram ID is required', statusCode: 400 };
      if (!diagram_data) throw { message: 'Diagram data is required', statusCode: 400 };

      const query = {
         text: 'UPDATE diagrams SET diagram_data = $1, name=$2, slug=$3, description=$4, updated_at=CURRENT_TIMESTAMP,created_by=$5, sharing_settings=$6 WHERE id = $7 RETURNING *',
         values: [JSON.stringify(diagram_data), name, slug, description, created_by, sharing_settings, id],
      }

      const result = await pool.query(query);
      const diagram = result.rows[0];
      diagram.diagram_data = JSON.parse(diagram.diagram_data);

      if (!diagram) {
         throw { message: 'Diagram not found', statusCode: 404 };
      }

      return res.json(diagram)
   } catch (error) {
      next(error)
   }
}

/**
 * Deletes a diagram by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The deleted diagram.
 */
const deleteDiagramById = async (req, res, next) => {
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
   getAllDiagrams,
   updateDiagramById,
   deleteDiagramById,
}
