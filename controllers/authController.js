const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: "vars.env" });
exports.autenticarUsuario = async (req, res, next) => {
  //check errors

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.status(400).json({ errores: errores.array() });
  }
  //find the user and
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    res.status(401).json({ msg: "El usuario no existe" });
    return next();
  }
  //verify the pass and auth
  if (bcrypt.compareSync(password, usuario.password)) {
    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
      process.env.SECRETKEY,
      {
        expiresIn: "8h",
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ msg: "Password incorrecto" });
    next();
  }
};

exports.usuarioAuntenticado = (req, res, next) => {
  res.json({ usuario: req.usuario });
};
