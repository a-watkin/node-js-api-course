module.exports = function(req, res, next) {
  // 401 unauthorized - try again

  // 403 forbidden - don't try again you can't access this resource

  // denies access
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  // grants access
  next();
};
