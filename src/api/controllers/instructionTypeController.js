const { pool } = require('../../config/db');

/**
 * Creates a new instruction.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created instruction.
 */
const createInstructionType = async (req, res, next) => {
   try {
      const { instructionTypeData, userId } = req.body;

      if (!instructionTypeData || !instructionTypeData.name || !instructionTypeData.slug || !instructionTypeData.description || !instructionTypeData.parameters || !instructionTypeData.priority || !instructionTypeData.max_retry) throw { error: 'Instruction type data (name, slug, description, parameters, priority, and max retry) are required', statusCode: 400 };
      if (!userId) throw { error: 'User ID is required', statusCode: 400 };

      const query = {
         text: 'INSERT INTO instruction_types(name, slug, description, parameters, priority, max_retry, created_at, updated_at, created_by) VALUES($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $7) RETURNING *',
         values: [instructionTypeData.name, instructionTypeData.slug, instructionTypeData.description, JSON.stringify(instructionTypeData.parameters), instructionTypeData.priority, instructionTypeData.max_retry, userId],
      };

      const result = await pool.query(query);
      const instructionType = result.rows[0];
      instructionType.parameters = JSON.parse(instructionType.parameters);

      return res.status(201).json(instructionType);
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
const getInstructionTypeById = async (req, res, next) => {
   try {
      const { id } = req.params;
      if (!id) throw { error: 'Instruction type ID is required', statusCode: 400 };

      const query = {
         text: 'SELECT * FROM instruction_types WHERE id = $1',
         values: [id],
      };

      const result = await pool.query(query);
      const instructionType = result.rows[0];
      if (!instructionType) throw { error: 'Instruction type not found', statusCode: 404 };

      // Assuming parameters is a JSON string
      instructionType.parameters = JSON.parse(instructionType.parameters);

      res.status(200).json(instructionType);

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
const getAllInstructionTypes = async (req, res, next) => {
   try {
      const result = await pool.query('SELECT * FROM instruction_types');
      const instructionTypes = result.rows;
      if (!instructionTypes) throw { error: 'Instruction not found', statusCode: 404 };
      instructionTypes.map(instructionType => instructionType.parameters = JSON.parse(instructionType.parameters))
      res.status(200).json(instructionTypes);
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
const updateInstructionTypeById = async (req, res, next) => {
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
const deleteInstructionTypeById = async (req, res, next) => {
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
   createInstructionType,
   getInstructionTypeById,
   getAllInstructionTypes,
   updateInstructionTypeById,
   deleteInstructionTypeById,
}
