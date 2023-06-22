const { pool } = require('../../config/db');

/**
 * Creates a new instruction.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created instruction.
 */
const createDiagramInstruction = async (req, res, next) => {
   try {
      const { userId } = req.user;
      const diagramInstructionData = req.body;

      if (!userId) throw { error: 'User ID is required', statusCode: 400 };
      if (!diagramInstructionData || !diagramInstructionData.instruction_types_id || !diagramInstructionData.diagram_id || !diagramInstructionData.instruction_order || !diagramInstructionData.node_id || !diagramInstructionData.parameters) throw { error: 'Diagram Diagram instruction data (diagram_id, instruction_types_id, node_id, instruction_order and parameters) are required', statusCode: 400 };

      const query = {
         text: 'INSERT INTO diagram_instructions(diagram_id, instruction_types_id, node_id, instruction_order , parameters, created_at, updated_at) VALUES($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *',
         values: [diagramInstructionData.diagram_id, diagramInstructionData.instruction_types_id, diagramInstructionData.node_id, diagramInstructionData.instruction_order, JSON.stringify(diagramInstructionData.parameters)],
      };

      const result = await pool.query(query);
      const diagramInstruction = result.rows[0];

      res.data = diagramInstruction;
      res.statusCode = 201;
      res.message = 'Diagram instruction created successfully!';

      next()
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
const getDiagramInstructionById = async (req, res, next) => {
   try {
      const { id } = req.params;
      if (!id) throw { error: 'Diagram diagram instruction ID is required', statusCode: 400 };

      const query = {
         text: 'SELECT * FROM diagram_instructions WHERE id = $1',
         values: [id],
      };

      const result = await pool.query(query);
      const diagramInstruction = result.rows[0];
      if (!diagramInstruction) throw { error: `Diagram instruction with id:${id} not found!`, statusCode: 404 };

      res.data = diagramInstruction;
      res.statusCode = 200;
      res.message = `Diagram instruction with id:${id}, retrieved successfully!`;

      next()

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
const getAllDiagramInstructions = async (req, res, next) => {
   try {
      const page = parseInt(req.query.page) || 1;  // set default page to 1 if it's not available
      const limit = parseInt(req.query.limit) || 20;  // set default limit to 20 if it's not available
      const offset = (page - 1) * limit;

      const result = await pool.query('SELECT COUNT(*) OVER() as total, * FROM diagram_instructions ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]);
      const diagramInstructions = result.rows;

      if (!diagramInstructions.length) throw { error: 'No diagramInstructions found', statusCode: 404 };

      const totalPages = Math.ceil(diagramInstructions[0].total / limit);

      // Construct a pagination object
      const pagination = {
         totalItems: Number(diagramInstructions[0].total),
         currentPage: page,
         pageSize: limit,
         totalPages: totalPages,
         nextPage: page < totalPages ? page + 1 : null,
         prevPage: page > 1 ? page - 1 : null
      }

      // Remove total from the results
      diagramInstructions.map(diagram => delete diagram.total);

      res.data = {
         pagination: pagination,
         results: diagramInstructions
      };
      res.statusCode = 200;
      res.message = `${pagination.totalItems} diagram instructions retrieved successfully!`;

      next()

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
const updateDiagramInstructionById = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { ...fieldsToUpdate } = req.body;
      if (!id) throw { error: 'Diagram instruction ID is required', statusCode: 400 };

      // Construct the update query dynamically
      let updateStatement = 'UPDATE diagram_instructions SET';
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

      const diagramInstruction = result.rows[0];

      if (!diagramInstruction) {
         throw { error: 'Diagram instruction not found', statusCode: 404 };
      }

      res.data = diagramInstruction;
      res.statusCode = 200;
      res.message = 'Diagram instruction updated successfully!';
      next()


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
const deleteDiagramInstructionById = async (req, res, next) => {
   try {
      const { id } = req.params
      if (!id) throw { error: 'Instruction ID is required', statusCode: 400 };

      const query = {
         text: 'DELETE FROM diagram_instructions WHERE id = $1 RETURNING *',
         values: [id],
      };

      const result = await pool.query(query);
      const diagramInstruction = result.rows[0];

      if (!diagramInstruction) throw { error: 'DiagramInstruction not found', statusCode: 404 };

      res.data = diagramInstruction;
      res.statusCode = 200;
      res.message = `DiagramInstruction #:${diagramInstruction.id} deleted successfully!`;
      next()

   } catch (error) {
      next(error)
   }
}

module.exports = {
   createDiagramInstruction,
   getDiagramInstructionById,
   getAllDiagramInstructions,
   updateDiagramInstructionById,
   deleteDiagramInstructionById,
}