const jwt = require("jsonwebtoken");
const config = process.env;

function verifyToken(req, res, next) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res
      .status(404)
      .json({ error: "Token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, config.AUTH_TOKEN_SECRET);
    req.user = decoded;
    console.log(decoded);
  } catch (error) {
    return res.status(401).json({ error: error });
  }
  return next();
}

module.exports = verifyToken;
