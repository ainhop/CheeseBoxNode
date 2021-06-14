var express = require("express");
var router = express.Router();
const { create ,deleteById, update } = require('../models/usuario.models');

// const usuariosProductosRouter = require("./usuarios/productos");
// const usuariosRecetasRouter = require("./usuarios/recetas");

router.get("/", function (req, res, next) {
  res.json("Usuarios");
});

module.exports = router;
