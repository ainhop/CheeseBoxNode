var express = require("express");
var router = express.Router();
const { create ,deleteById, update } = require('../models/usuario.models');

// const usuariosProductosRouter = require("./usuarios/productos");
// const usuariosRecetasRouter = require("./usuarios/recetas");

router.post('/create', async (req, res) => {
  try {
      const result = await create(req.body);
      res.json(result);
  } catch (error) {
      console.log(error);
  }
})

router.delete('/delete/:usuariosId', async (req, res) => {
  const result = await deleteById(req.params.usuariosId);
  res.json(result);
})

router.put('/update/:usuariosId', async (req, res) => {
 try{
   const result = await update(req.params.usuariosId, req.body);
   res.json(result);
  }
 catch (error) {

  console.log(error)
  }
})
 module.exports = router;

