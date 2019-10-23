module.exports = function (req, res, next) {
  // 401 unauthorized - try again, if credentials are wrong you should return this

  // 403 forbidden - don't try again you can't access this resource

  // denies access - here it's 403 because the person calling is not an admin
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  // grants access
  next();
};
