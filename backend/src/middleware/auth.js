const jwt = require('jsonwebtoken');

// Middleware to verify JWT and attach user info to request
module.exports = function auth(req, res, next) {
  const header = req.header('Authorization');
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'Authorization token required' });

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role }; // Attach user ID and role
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
