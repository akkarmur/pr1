const { Router } = require("express");
const { verifyToken } = require("../../../configs/jwt");
const { createProduct, deleteProduct, updateProduct, getProduct } = require("./controller");
const { createProductSchema, updateProductSchema } = require("./schema");
const validator = require('../../../configs/validator')

const productRouters = async () => {
  const route = Router();
  route.post("/",validator(createProductSchema), verifyToken, await createProduct);

  route.patch("/:id",validator(updateProductSchema),verifyToken, await updateProduct);

  route.delete("/:id",verifyToken, await deleteProduct);

  route.get("/",verifyToken, await getProduct);



  return route;
};

module.exports = productRouters;
