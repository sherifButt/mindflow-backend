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

      if (!diagramData || !diagramData.data || !diagramData.name || !diagramData.slug || !diagramData.description || !diagramData.sharing_settings) throw { error: 'Diagram data, name, slug, description, and sharing settings are required', statusCode: 400 };
      if (!userId || !diagramData.created_by) throw { error: 'User ID is required', statusCode: 400 };

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
      if (!id) throw { error: 'Diagram ID is required', statusCode: 400 };

      const query = {
         text: 'SELECT * FROM diagrams WHERE id = $1',
         values: [id],
      };

      const result = await pool.query(query);
      const diagram = result.rows[0];
      if (!diagram) throw { error: 'Diagram not found', statusCode: 404 };

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
      if (!diagrams) throw { error: 'Diagram not found', statusCode: 404 };
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
      const { id } = req.params;
      const { ...fieldsToUpdate } = req.body;
      if (!id) throw { error: 'Diagram ID is required', statusCode: 400 };

      // Construct the update query dynamically
      let updateStatement = 'UPDATE diagrams SET';
      const values = [];
      let valueIndex = 1;
      
      for (const [key, value] of Object.entries(fieldsToUpdate)) {
         updateStatement += ` ${key} = $${valueIndex},`;
         values.push(value);
         valueIndex++;
      }

      // Add updated_at manually if it's not already included
      if (!fieldsToUpdate.hasOwnProperty('updated_at')) {
         updateStatement += ` updated_at = CURRENT_TIMESTAMP,`;
      }
      
      // Remove trailing comma and append the WHERE clause
      updateStatement = updateStatement.slice(0, -1);
      updateStatement += ` WHERE id = $${valueIndex} RETURNING *`;
      values.push(id);

      const result = await pool.query({
         text: updateStatement,
         values: values,
      });

      const diagram = result.rows[0];

      if (diagram && diagram.diagram_data) {
         diagram.diagram_data = JSON.parse(diagram.diagram_data);
      }

      if (!diagram) {
         throw { error: 'Diagram not found', statusCode: 404 };
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
      const { id } = req.params
      if (!id) throw { error: 'Diagram ID is required', statusCode: 400 };

      const query = {
         text: 'DELETE FROM diagrams WHERE id = $1 RETURNING *',
         values: [id],
      };

      const result = await pool.query(query);
      const diagram = result.rows[0];

      if (!diagram) throw { error: 'Diagram not found', statusCode: 404 };

      res.status(200).json({ message: `Diagram ${diagram.name} deleted successfully` });


      
   } catch (error) {
     next(error)
   }
}

module.exports = {
   createDiagram,
   getDiagramById,
   getAllDiagrams,
   updateDiagramById,
   deleteDiagramById,
}
