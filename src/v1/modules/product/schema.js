exports.createProductSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2, maxLength: 32 },
    image: { type: "string", minLength: 2, maxLength: 32 },
    category_id: { type: "integer" },
  },
  required: ["name", "image", "category_id"],
  additionalProperties: false,
};

exports.updateProductSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2, maxLength: 32 },
    image: { type: "string", minLength: 2, maxLength: 32 },
    category_id: { type: "integer" },
  },
  additionalProperties: false,
};

