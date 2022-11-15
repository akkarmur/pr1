const connection = require("../../../configs/connection");

exports.createProduct = async (req, res) => {
  try {
    const [checkCategory] = await connection.execute(
      `select id from category where id = '${req.body.category_id}';`
    );

    if (!checkCategory?.length) {
      res.status(404).send("Category not found.");
      return;
    }
    await connection.execute(
      `INSERT INTO pr1.product
      (name, image, category_id)
      VALUES ('${req.body.name}', '${req.body.image}', '${req.body.category_id}');;
      `
    );
    res.status(201).send("Created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [checkProduct] = await connection.execute(
      `select name, image, category_id from product where id = '${req.params.id}' and is_deleted = 0 ;`
    );

    if (!checkProduct?.length) {
      res.status(404).send("Product not found.");
      return;
    }

    const [checkCategory] = await connection.execute(
      `select id from category where id = '${req.body.category_id}';`
    );

    if (!checkCategory?.length) {
      res.status(404).send("Category not found.");
      return;
    }
    await connection.execute(
      `UPDATE product set 
            name = '${req?.body?.name || checkProduct?.name}',
            image ='${req?.body?.image || checkProduct?.image}',
            category_id = '${
              req?.body?.category_id || checkProduct?.category_id
            }'
        WHERE id = '${req.params.id}';`
    );
    res.status(200).send("Updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const [checkProduct] = await connection.execute(
      `select name, image, category_id from product where id = '${req.params.id}' and is_deleted = 0 ;`
    );

    if (!checkProduct?.length) {
      res.status(404).send("Product not found.");
      return;
    }

    await connection.execute(
      `UPDATE product set 
              is_deleted = 1
          WHERE id = '${req.params.id}';`
    );
    res.status(200).send("Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.getProduct = async (req, res) => {
  try {
    const [productCount] = await connection.execute(
      `select count(*) as count from product where is_deleted = 0 and name like '${
        req?.query?.name || ""
      }%' ;`
    );

    const [product] = await connection.execute(
      `select name, image, category_id from product where is_deleted = 0 and name like '${
        req?.query?.name || ""
      }%' order by create_timestamp DESC limit ${req.query.limit || 5} offset ${
        req.query.offset ? req.query.offset - 1 : 0
      };`
    );
    if (product?.length) {
      const response = {
        page_number: req?.query?.offset || 1,
        total: productCount[0].count,
        data: product,
      };
      res.status(200).send(response);
    } else {
      res.status(404).send("Product not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
