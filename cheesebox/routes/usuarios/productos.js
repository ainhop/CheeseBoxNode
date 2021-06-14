const router = require("express").Router();
module.exports = router;

const { getAll } = require("../../models/producto.models");

router.get("/", async (req, res) => {
  const rows = await getAll();
  res.json(productos);
});

router.post("/", async (req, res) => {
  const result = await create(req.body);
  res.json(result);
});
