


const mongoose = require('mongoose');
const diagramSchema = new mongoose.Schema({
  diagramData: {
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
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sharing_settings: {
    type: String,
    enum: ['private', 'public'],
    default: 'private',
  },
});

const Diagram = mongoose.model('Diagram', diagramSchema);

module.exports = Diagram;





