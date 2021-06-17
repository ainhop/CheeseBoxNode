var express = require('express');
var router = express.Router();

const {
  create,
  deleteById,
  update,
  getById,
} = require("../models/usuario.models");

const path = require('path');
const fs = require('fs')
const multer = require('multer');
const upload = multer({ dest: 'public/images/usuarios/' });
const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


router.post('/create', upload.single('imagen'), async (req, res) => {
  try {
    const extension = '.' + req.file.mimetype.split('/')[1];
    const newName = 'http://localhost:3000/images/usuarios/' + req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath )
    req.body.imagen = newName
    const result = await create(req.body);
      res.json(result);
  } catch (error) {
      console.log(error);
  }
})



router.put("/update/:usuarioId", async (req, res) => {
  try {
    const result = await update(req.params.usuarioId, req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
})


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
