const express = require("express");
const productRouters = require("./src/v1/modules/product/route");
const userRouters = require("./src/v1/modules/user/route");
require("dotenv").config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
(async () => {
  app.use("/user", await userRouters());
  app.use("/product", await productRouters());
})();

app.listen(port, () => {
  console.log("Server is running on ", port);
});
