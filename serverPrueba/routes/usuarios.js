const router = require("express").Router();

const usuariosProductosRouter = require("./usuarios/productos");
const usuariosRecetasRouter = require("./usuarios/recetas");

router.use("/productos", usuariosProductosRouter);
router.use("recetas", usuariosRecetasRouter);

module.exports = router;
