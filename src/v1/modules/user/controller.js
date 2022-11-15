const connection = require("../../../configs/connection");
const { generatedToken } = require("../../../configs/jwt");

exports.login = async (req, res) => {
  try {
    const [data] = await connection.execute(
      `select * from user where email = '${req.body.email}' and pass = '${req.body.pass}' where is_deleted = 0;`
    );
    if (data?.length) {
      const response = generatedToken({
        id: data[0].id,
        email: data[0].email,
      });
      res.send(response);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.register = async (req, res) => {
  try {
    const [checkExist] = await connection.execute(
      `select id, name, email from user where email = '${req.body.email}';`
    );

    if (checkExist?.length) {
      res.status(403).send("User already exist.");
      return;
    }

    await connection.execute(
      `insert into user (name, email, pass) values ('${req.body.name}', '${req.body.email}', '${req.body.pass}');`
    );
    res.status(201).send("Created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
