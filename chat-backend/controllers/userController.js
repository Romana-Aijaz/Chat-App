const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user 
console.log(currentUserId)
    const users = await User.find({ _id: { $ne: currentUserId } }).select('-password');
    
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllUsers,
};
