



/**
 * Creates a new node.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The created node.
 */
const createNode = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newNode = new Node({ name, description });
    const savedNode = await newNode.save();
    res.status(201).json(savedNode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create node' });
  }
};

/**
 * Retrieves a node by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The retrieved node.
 */
const getNode = async (req, res) => {
  try {
    const { nodeId } = req.params;
    const node = await Node.findById(nodeId);
    if (!node) {
      return res.status(404).json({ error: 'Node not found' });
    }
    res.json(node);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve node' });
  }
};

/**
 * Updates a node by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The updated node.
 */
const updateNode = async (req, res) => {
  try {
    const { nodeId } = req.params;
    const { name, description } = req.body;
    const updatedNode = await Node.findByIdAndUpdate(
      nodeId,
      { name, description },
      { new: true }
    );
    if (!updatedNode) {
      return res.status(404).json({ error: 'Node not found' });
    }
    res.json(updatedNode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update node' });
  }
};

/**
 * Deletes a node by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The deleted node.
 */
const deleteNode = async (req, res) => {
  try {
    const { nodeId } = req.params;
    const deletedNode = await Node.findByIdAndDelete(nodeId);
    if (!deletedNode) {
      return res.status(404).json({ error: 'Node not found' });
    }
    res.json(deletedNode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete node' });
  }
};

module.exports = {
  createNode,
  getNode,
  updateNode,
  deleteNode,
};

