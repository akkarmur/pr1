const Ajv = require("ajv");

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const validator = (schema, data) => (req, res, next) => {
  const validate = ajv.compile(schema);
  const valid = validate({ ...req.body, ...data });
  if (!valid) {
    res.status(400).send(validate.errors[0].message);
    return;
  } else {
    next();
  }
};

module.exports = validator;
