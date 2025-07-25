module.exports = function restrictToAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'fail',
      message: 'Access denied. Admins only.',
    });
  }
  next();
};
