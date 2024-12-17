const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Access denied' });
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
