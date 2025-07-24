// controllers/uploadController.js
const path = require('path');
const Message = require('../models/Message');

const handleFileUpload = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const newMessage = await Message.create({
      sender,
      receiver,
      fileUrl,
      messageType: 'file',
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
};

module.exports = { handleFileUpload };
