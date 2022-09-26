function Validator(schema) {
  return function validate(req, res, next) {
    try {
      const { value, error } = schema.validate(req.body || {});

      if (error) {
        return res.status(500).json({ error: error.details });
      }

      req.body = value;
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };
}
module.exports = Validator;
