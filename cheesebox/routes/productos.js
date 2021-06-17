var express = require('express');
var router = express.Router();
const { getAll, create, getById, update, deleteById } = require('../models/producto.models');

const path = require('path');
const fs = require('fs')
const multer = require('multer');
const upload = multer({ dest: 'public/images/productos/' });
const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


router.get("/", async (req, res) => {
  try{
    const productos = await getAll();
    res.json(productos)
  } 
  catch (error) {
    (console.error('Sigue buscando'))
  }
});

router.post('/create', upload.single('imagen'), async (req, res) => {
  try {
    const extension = '.' + req.file.mimetype.split('/')[1];
    const newName = 'http://localhost:3000/images/productos/' + req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath )
    req.body.imagen = newName
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
