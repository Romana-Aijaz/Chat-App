const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1]; // Get token after 'Bearer'

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    console.log("Decoded user ID:", decoded.id);
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};


