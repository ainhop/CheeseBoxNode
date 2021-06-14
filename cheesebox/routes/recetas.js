var express = require("express");
var router = express.Router();

const {
  getAll,
  create,
  getById,
  update,
  deleteById,
} = require("../models/receta.models");

// GET http://localhost:3000/recetas
router.get("/", async (req, res) => {
  try {
    const recetas = await getAll();
    res.json(recetas);
  } catch (error) {
    console.log("David: se ha roto esto");
  }
});
// POST http://localhost:3000/recetas/create
router.post("/create", async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    ("David dice super error");
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
