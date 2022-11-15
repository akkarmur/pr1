exports.loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", minLength: 2, maxLength: 32 },
    pass: { type: "string", minLength: 2, maxLength: 32 },
    category_id: { type: "integer" },
  },
  required: ["email", "pass"],
  additionalProperties: false,
};

exports.registerSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2, maxLength: 32 },
    email: { type: "string", minLength: 2, maxLength: 32 },
    pass: { type: "string", minLength: 2, maxLength: 32 },
  },
  required: ["name", "email", "pass"],
  additionalProperties: false,
};
