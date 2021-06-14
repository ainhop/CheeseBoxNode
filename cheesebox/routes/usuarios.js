<<<<<<< HEAD
var express = require('express');
=======
var express = require("express");
>>>>>>> develop
var router = express.Router();

const usuariosProductosRouter = require("./usuarios/productos");
const usuariosRecetasRouter = require("./usuarios/recetas");

<<<<<<< HEAD
 router.get("/", function (req, res, next) {
   res.render("Usuarios");
 });

 module.exports = router;
=======
router.get("/Usuarios", function (req, res, next) {
  res.render("Usuarios");
});
>>>>>>> develop

