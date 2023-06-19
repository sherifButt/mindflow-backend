const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  job_id: {
    type: Number,
    required: true,
  },
  instruction_id: {
    type: Number,
    required: true,
  },
  trigger_time: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;





