var express = require("express");
var router = express.Router();
const {
  getAll,
  create,
  getById,
  update,
  deleteById,
  getByItem,
  createFav,
  getFav
  
} = require("../models/producto.models");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { checkToken } = require("../middlewares/middleware");
const upload = multer({ dest: "public/images/productos/" });
const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit || 6;
    const page = req.query.page || 10;
    const productos = await getAll(parseInt(limit), parseInt(page));
    res.json(productos);
  } catch (error) {
    res.json({ error: "búsqueda incorrecta" });
  }
});

router.get("/search/:producto", async (req, res) => {
  try {
    const producto = await getByItem(req.params.producto);
    if (producto) {
      res.json(producto);
    } else {
      ("este queso no está");
    }
  } catch (error) {
    res.json("algo salió mal");
  }
});
router.post(
  "/create",
  checkToken,
  upload.single("imagen"),
  async (req, res) => {
    console.log(req.user);
    try {
      const extension = "." + req.file.mimetype.split("/")[1];
      const newName =
        "http://localhost:3000/images/productos/" +
        req.file.filename +
        extension;
      const newPath = req.file.path + extension;
      fs.renameSync(req.file.path, newPath);
      req.body.imagen = newName;
      req.body.fk_usuario = req.user.id;
      const result = await create(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/:productoId", async (req, res) => {
  try {
    const producto = await getById(req.params.productoId);
    if (producto) {
      res.json(producto);
    } else {
      ("este ID no existe");
    }
  } catch (error) {
    res.json("error");
  }
});

router.delete("/delete/:productosId", async (req, res) => {
  const result = await deleteById(req.params.productosId);
  res.json(result);
});

router.put("/update/:productosId", async (req, res) => {
  try {
    const result = await update(req.params.productosId, req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fav/all", checkToken, async (req, res) => {
  try {
    const result = await getFav(req.user.id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fav/:productosId", checkToken, async (req, res) => {
  try {
    const result = await createFav(req.user.id, req.params.productosId);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
router.get('/info/pag', async (req, rest) => {
  try {
      const rows = await paginator();
      console.log(rows);
      rows.numPaginas = Math.ceil(rows.numPaginas)
      rest.json(rows);
  } catch (err) {
      rest.json(err);
  };
});

module.exports = router;
