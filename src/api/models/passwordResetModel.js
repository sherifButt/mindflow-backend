


const mongoose = require('mongoose');
const passwordResetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resetToken: {
    type: String,
    required: true,
  },
  expiryTime: {
    type: Date,
    required: true,
  },
});

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

module.exports = PasswordReset;



