var express = require("express");
var router = express.Router();

const usuariosProductosRouter = require("./usuarios/productos");
const usuariosRecetasRouter = require("./usuarios/recetas");

router.get("/Usuarios", function (req, res, next) {
  res.render("Usuarios");
});

module.exports = router;
