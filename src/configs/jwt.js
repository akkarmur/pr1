const jwt = require("jsonwebtoken");

exports.generatedToken = (data) => {
  return jwt.sign(data, process.env.SECRETE_KEY);
};

exports.verifyToken = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers["authorization"],
      process.env.SECRETE_KEY
    );
    req.body.jwt = decoded;
    next();
  } catch (error) {
    res.status(401).send(error?.msg)
  }
};
