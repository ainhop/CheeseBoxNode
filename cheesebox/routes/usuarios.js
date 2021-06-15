var express = require("express");
var router = express.Router();
const { create, deleteById, update, getById } = require('../models/usuario.models');

// const usuariosProductosRouter = require("./usuarios/productos");
// const usuariosRecetasRouter = require("./usuarios/recetas");

router.put("/update/:usuarioId", async (req, res) => {
  console.log(req.params.usuarioId)
  try {
    const result = await update(req.params.usuarioId, req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});


router.post("/create", async (req, res) => {
  console.log('Hola')
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    ("David dice super error");
  }
});


router.get('/:usuarioId', async (req, res) => {
  try {
    const usuario = await getById(req.params.usuarioId);
    if (usuario) {
      res.json(usuario)
    } else {
      ('este ID es mentira')
    }
  }
  catch(error) {
    res.json('Error mu chungo')
  }
})


router.delete("/delete/:usuarioId", async (req, res) => {
  const result = await deleteById(req.params.usuarioId);
  res.json(result);
});



module.exports = router;
