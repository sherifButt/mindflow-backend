


const mongoose = require('mongoose');
const instructionSchema = new mongoose.Schema({
  diagramId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagram',
    required: true,
  },
  nodeId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parameters: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  scheduledTime: {
    type: Date,
    required: true,
  },
  retryCount: {
    type: Number,
    default: 0,
  },
  maxRetry: {
    type: Number,
    default: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Instruction = mongoose.model('Instruction', instructionSchema);

module.exports = Instruction;

