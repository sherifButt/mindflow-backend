



const { Schema } = mongoose;

const actionLogSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ActionLog = mongoose.model('ActionLog', actionLogSchema);

module.exports = ActionLog;





