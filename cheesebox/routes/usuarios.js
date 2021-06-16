var express = require("express").Router();

const {
  create,
  deleteById,
  update,
  getById,
} = require("../models/usuario.models");

const router = require("./otracosa/usuarios");

// const usuariosProductosRouter = require("./usuarios/productos");
// const usuariosRecetasRouter = require("./usuarios/recetas");

const { checkToken } = require("./middlewares");
const usuariosUsuariosRouter = require("./otracosa/usuarios");
router.use("/otracosa", usuariosUsuariosRouter);

router.put("/update/:usuarioId", async (req, res) => {
  try {
    const result = await update(req.params.usuarioId, req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    ("error");
  }
});

router.get("/:usuarioId", async (req, res) => {
  try {
    const usuario = await getById(req.params.usuarioId);
    if (usuario) {
      res.json(usuario);
    } else {
      ("el id no existe");
    }
  } catch (error) {
    res.json("error");
  }
});

router.delete("/delete/:usuarioId", async (req, res) => {
  const result = await deleteById(req.params.usuarioId);
  res.json(result);
});

router.get("/", function (req, res, next) {
  res.json("Usuarios");
});

router.post("/registro", (req, res) => {
  create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
