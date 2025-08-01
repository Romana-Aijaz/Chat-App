const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
    },
    fileUrl: { type: String }, // ✅ new
    messageType: { type: String, enum: ['text', 'file'], default: 'text' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
