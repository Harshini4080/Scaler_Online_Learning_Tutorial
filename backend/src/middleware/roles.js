// Middleware to restrict access based on user role
module.exports = function permit(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' }); // Deny access if role mismatches
    }
    next();
  };
};
