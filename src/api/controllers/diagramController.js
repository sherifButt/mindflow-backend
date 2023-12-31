const { pool } = require('../../config/db');

/**
 * Creates a new diagram.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created diagram.
 */
const createDiagram = async (req, res, next) => {
   try {
      const { userId } = req.user;
      const diagramData = req.body;

      if (!diagramData || !diagramData.data || !diagramData.name || !diagramData.slug || !diagramData.description || !diagramData.sharing_settings) throw { error: 'Diagram data, name, slug, description, and sharing settings are required', statusCode: 400 };
      if (!userId || !diagramData.created_by) throw { error: 'User ID is required', statusCode: 400 };

      const query = {
         text: 'INSERT INTO diagrams(diagram_data, name, slug, description, created_at, updated_at, created_by, sharing_settings) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $5, $6) RETURNING *',
         values: [JSON.stringify(diagramData.data), diagramData.name, diagramData.slug, diagramData.description, userId, diagramData.sharing_settings],
      };

      const result = await pool.query(query);
      const diagram = result.rows[0];

      res.data = diagram;
      res.statusCode = 201;
      res.message = 'Diagram created successfully!';

      next()
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

      res.data = diagram;
      res.statusCode = 200;
      res.message = `Diagram with id:${id}, retrieved successfully!`;

      next()
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
      const page = parseInt(req.query.page) || 1;  // set default page to 1 if it's not available
      const limit = parseInt(req.query.limit) || 20;  // set default limit to 20 if it's not available
      const offset = (page - 1) * limit;

      const result = await pool.query('SELECT COUNT(*) OVER() as total, * FROM diagrams ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      const diagrams = result.rows;

      if (!diagrams.length) throw { error: 'No diagrams found', statusCode: 404 };

      // Calculate total pages
      const totalPages = Math.ceil(diagrams[0].total / limit);

      // Construct a pagination object
      const pagination = {
         totalItems: Number(diagrams[0].total),
         currentPage: page,
         pageSize: limit,
         totalPages: totalPages,
         nextPage: page < totalPages ? page + 1 : null,
         prevPage: page > 1 ? page - 1 : null
      }

      // Remove total from the results
      diagrams.map(diagram => delete diagram.total);

      res.data = {
         pagination: pagination,
         results: nodes
      }
      res.statusCode = 200;
      res.message = `${pagination.totalItems} diagrams retrieved successfully!`;

      next()
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

      if (!diagram) {
         throw { error: 'Diagram not found', statusCode: 404 };
      }

      res.data = diagram;
      res.statusCode = 200;
      res.message = `Diagram with id:${id}, updated successfully!`;

      next()
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

      res.message = `Diagram ${diagram.name} deleted successfully`
      res.statusCode = 200;

      next()

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
