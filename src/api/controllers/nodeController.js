const { pool } = require('../../config/db');

/**
 * Creates a new instruction.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created instruction.
 */
const createNode = async (req, res, next) => {
  try {
     const { userId } = req.user;
     const nodeData = req.body;

     if (!userId) throw { error: 'User ID is required', statusCode: 400 };
     if (!nodeData || !nodeData.diagram_id || !nodeData.position || !nodeData.type || !nodeData.data) throw { error: 'Node data (diagram_id, position, type and data) are required', statusCode: 400 };

     const query = {
        text: 'INSERT INTO nodes(diagram_id, position, type, data, created_at, updated_at,created_by) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,$5) RETURNING *',
        values: [nodeData.diagram_id, nodeData.position, nodeData.type, nodeData.data, userId],
     };

     const result = await pool.query(query);
     const node = result.rows[0];

     return res.status(201).json(node);
  } catch (error) {
     next(error);
  }
};



/**
 * Retrieves a instruction by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The retrieved instruction.
 */
const getNodeById = async (req, res, next) => {
   try {
      const { id } = req.params;
      if (!id) throw { error: 'Diagram instruction type ID is required', statusCode: 400 };

      const query = {
         text: 'SELECT * FROM diagram_instructions WHERE id = $1',
         values: [id],
      };

      const result = await pool.query(query);
      const node = result.rows[0];
      if (!node) throw { error: 'Diagram instruction not found', statusCode: 404 };

      // Assuming parameters is a JSON string
      node.parameters = JSON.parse(node.parameters);

      res.status(200).json(node);

   } catch (error) {
      next(error);
   }
}


/**
 * Retrieves all instructions.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The retrieved instruction.
 */
const getAllNodes = async (req, res, next) => {
   try {
      const page = parseInt(req.query.page) || 1;  // set default page to 1 if it's not available
      const limit = parseInt(req.query.limit) || 20;  // set default limit to 20 if it's not available
      const offset = (page - 1) * limit;

      const result = await pool.query('SELECT COUNT(*) OVER() as total, * FROM instruction_types ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      const instructionTypes = result.rows;

      if (!instructionTypes.length) throw { error: 'No instructionTypes found', statusCode: 404 };

      instructionTypes.map(diagram => diagram.parameters = JSON.parse(diagram.parameters))

      const totalPages = Math.ceil(instructionTypes[0].total / limit);

      // Construct a pagination object
      const pagination = {
         totalItems: Number(instructionTypes[0].total),
         currentPage: page,
         pageSize: limit,
         totalPages: totalPages,
         nextPage: page < totalPages ? page + 1 : null,
         prevPage: page > 1 ? page - 1 : null
      }

      // Remove total from the results
      instructionTypes.map(diagram => delete diagram.total);

      res.status(200).json({
         pagination: pagination,
         results: instructionTypes
      });
   } catch (error) {
      next(error);
   }

}

/**
 * Updates a instruction by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated instruction.
 */
const updateNodeById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { ...fieldsToUpdate } = req.body;
      if (!id) throw { error: 'Instruction Type ID is required', statusCode: 400 };

      // Construct the update query dynamically
      let updateStatement = 'UPDATE instruction_types SET';
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

      const instructionType = result.rows[0];

      if (!instructionType) {
         throw { error: 'Instruction Type not found', statusCode: 404 };
      }

      return res.json(instructionType)
   } catch (error) {
      next(error)
   }
}




/**
 * Deletes a instruction by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The deleted instruction.
 */
const deleteNodeById = async (req, res, next) => {
   try {
      const { id } = req.params
      if (!id) throw { error: 'Instruction ID is required', statusCode: 400 };

      const query = {
         text: 'DELETE FROM instruction_types WHERE id = $1 RETURNING *',
         values: [id],
      };

      const result = await pool.query(query);
      const instructionType = result.rows[0];

      if (!instructionType) throw { error: 'InstructionType not found', statusCode: 404 };

      res.status(200).json({ message: `InstructionType ${instructionType.name} deleted successfully` });



   } catch (error) {
      next(error)
   }
}

module.exports = {
   createNode,
   getNodeById,
   getAllNodes,
   updateNodeById,
   deleteNodeById,
}
