const validateAllowedUpdates = (allowedUpdates) => (req, res, next) => {
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((u) => allowedUpdates.includes(u));
  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid update!" });
  }

  next();
};

const validateIds = (paramNames) => (req, res, next) => {
  for (const paramName of paramNames) {
    const id = req.params[paramName];

    if (!id) {
      return res.status(400).json({ message: `Missing ${paramName}` });
    }

    const parsedId = parseInt(id, 10);
    if (!Number.isInteger(parsedId) || parsedId < 1) {
      return res
        .status(400)
        .json({ message: `${paramName} must be a positive integer!` });
    }
  }

  next();
};

module.exports = {
  validateAllowedUpdates,
  validateIds,
};
