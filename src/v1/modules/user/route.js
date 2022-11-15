const { Router } = require("express");
const { login, register } = require("./controller");
const validator = require("../../../configs/validator");
const { registerSchema, loginSchema } = require("./schema");

const userRouters = async () => {
  const route = Router();
  route.post("/login", validator(loginSchema), await login);

  route.post("/register", validator(registerSchema), await register);

  return route;
};

module.exports = userRouters;
