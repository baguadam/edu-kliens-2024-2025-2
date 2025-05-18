const { expressjwt: doAuth } = require("express-jwt");

// Middleware for JWT authentication
const jwtAuth = doAuth({ secret: "secret-key", algorithms: ["HS256"] });

// Middleware to handle missing parameters
const handleMissingParamError = (requiredParams) => (req, res, next) => {
  const missingParams = requiredParams.filter((param) => !(param in req.body));
  if (missingParams.length > 0) {
    return res.status(400).json({
      error: `Missing required parameters: ${missingParams.join(", ")}`,
    });
  }

  next();
};

// Middleware to handle authentication errors
const handleAuthError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Not authorized" });
  }

  next(err);
};

// Middleware to handle teacher id matching in case of modifications
const handleNotMatchingTeacher = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Missing Teacher id!" });
  } else if (parseInt(req.params.id) !== parseInt(req.auth.id)) {
    return res
      .status(401)
      .json({ message: "Not authorized to modify the user!" });
  }

  next();
};

module.exports = {
  jwtAuth,
  handleMissingParamError,
  handleAuthError,
  handleNotMatchingTeacher,
};
