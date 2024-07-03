const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send('Admin access required');
  next();
};

module.exports = { authenticate, isAdmin };
