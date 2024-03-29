const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "vars.env" });
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.SECRETKEY);
      req.usuario = user;
    } catch (error) {
      console.log(error);
    }
  }
  return next();
};
