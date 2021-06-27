var express = require("express");
var router = express.Router();
const {
  getAll,
  create,
  getById,
  update,
  deleteById,
  getByItem,
  getFav,
  createFav,
  deleteFav,
  checkFav,
  
} = require("../models/receta.models");

const { checkToken, checkTokenLight } = require("../middlewares/middleware");
const fs = require('fs')
const multer = require('multer');
const upload = multer({ dest: 'public/images/recetas/' });

// router.get("/", async (req, res) => {
//   try {
//     const limit = req.query.limit || 6;
//     const page = req.query.page || 10;

//     const recetas = await getAll(parseInt(limit), parseInt(page));
//     res.json(recetas);
//   } catch (error) {
//     res.json({ error: "búsqueda incorrecta" });
//   }
// });


router.get("/", checkTokenLight, async (req, res) => {
  console.log(req.user)
  try {
    const limit = req.query.limit || 6;
    const page = req.query.page || 10;
    const recetas = await getAll(parseInt(limit), parseInt(page));
    if (req.user === null) {
      res.json(recetas);
    }
    else {
      for (let receta of recetas) {
        receta.favorito = await checkFav(req.user.id, receta.id)
        
      }
      res.json(recetas);
    }
  } catch (error) {
    res.json({ error: "búsqueda incorrecta" });
  }
});


router.get("/search/:recetas", async (req, res) => {
  try {
    const recetas = await getByItem(req.params.recetas);
    console.log(recetas)
    if (recetas) {
      res.json(recetas);
    } else {
      ("este queso no está");
    }
  } catch (error) {
    res.json(error);
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

router.post(
  "/create",
  checkToken,
  upload.single("imagen"),
  async (req, res) => {
    console.log(req.user);
    try {
      const extension = "." + req.file.mimetype.split("/")[1];
      const newName =
        "http://localhost:3000/images/recetas/" +
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

router.get("/fav/all", checkToken, async (req, res) => {
  try {
    const result = await getFav(req.user.id);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/fav/:recetasId", checkToken, async (req, res) => {
  try {
    const check = await checkFav(req.user.id, req.params.recetasId);
    if (check) {
      return res.json({error : 'Ya se encuentra como favorito'})
    }
    const result = await createFav(req.user.id, req.params.recetasId);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/fav/delete/:recetasId", checkToken, async (req, res) => {
  try {
    const result = await deleteFav(req.user.id, req.params.recetasId);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
