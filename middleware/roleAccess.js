function roleAccess(allowedRole) {
  return function validate(req, res, next) {
    try {
      if (!req.user || req.user.role !== allowedRole) {
        throw new Error("User role has no access to api");
      }
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };
}
module.exports = roleAccess;
