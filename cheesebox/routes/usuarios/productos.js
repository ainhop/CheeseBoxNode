const router = require("express").Router();
module.exports = router;

const { getAll } = require("../../models/producto.models");

router.get("/", async (req, res) => {
  try{
    const rows = await getAll()
    res.json(rows)
  } 
  catch (error) {
    (console.error('Ainho: Sigue buscando'))
  }
});

router.post("/", async (req, res) => {
  const result = await create(req.body);
  res.json(result);
});
