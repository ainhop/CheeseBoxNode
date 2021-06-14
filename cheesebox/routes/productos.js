var express = require('express');
var router = express.Router();
const { getAll, create, getById, update, deleteById } = require('../models/producto.models');

router.get("/", async (req, res) => {
  try{
    const productos = await getAll();
    res.json(productos)
  } 
  catch (error) {
    (console.error('Sigue buscando'))
  }
});

router.post('/create', async (req, res) => {
  try {
      const result = await create(req.body);
      res.json(result);
  } catch (error) {
      console.log(error);
  }
})

router.get('/:productoId', async (req, res) => {
  try {
    const producto = await getById(req.params.productoId);
    if (producto) {
      res.json(producto)
 
    } else {
      ('este ID es mentira')
    }
  }
  catch(error) {
    res.json('Error mu chungo')
  }
})

router.delete('/delete/:productosId', async (req, res) => {
  const result = await deleteById(req.params.productosId);
  res.json(result);
})

router.put('/update/:productosId', async (req, res) => {
 try{
  const result = await update(req.params.productosId, req.body);
   res.json(result);
  }
 catch (error) {
  console.log(error)
  }
})
module.exports = router;
