var express = require("express");
var router = express.Router();
const {
  getAll,
  create,
  getById,
  update,
  deleteById,
} = require("../models/receta.models");

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/images/recetas/" });
const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// router.get("/", async (req, res) => {
//   try {
//     const recetas = await getAll();
//     res.json(recetas);
//   } catch (error) {
//     console.error("Sigue buscando");
//   }
// });

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit || 6;
    const page = req.query.page || 1;

    const recetas = await getAll(parseInt(limit), parseInt(page));
    res.json(recetas);
  } catch (error) {
    res.json({ error: "búsqueda incorrecta" });
  }
});

router.post("/create", upload.single("imagen"), async (req, res) => {
  try {
    const extension = "." + req.file.mimetype.split("/")[1];
    const newName =
      "http://localhost:3000/images/recetas/" + req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath);
    req.body.imagen = newName;
    const result = await create(req.body);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:recetaId", async (req, res) => {
  try {
    const receta = await getById(req.params.recetaId);
    if (receta) {
      res.json(receta);
    } else {
      res.json({ message: "El id no existe" });
    }
  } catch (error) {
    res.json({ error: "no funciona" });
  }
});

router.put("/update/:recetasId", async (req, res) => {
  try {
    const result = await update(req.params.recetasId, req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:recetasId", async (req, res) => {
  const result = await deleteById(req.params.recetasId);
  res.json(result);
});

module.exports = router;
