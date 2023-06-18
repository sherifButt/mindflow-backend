



const avatarSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Avatar = mongoose.model('Avatar', avatarSchema);

module.exports = Avatar;







