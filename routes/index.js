var express = require("express");
var router = express.Router();
const { getByItem } = require("../models/index.models");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("");
});

router.get("/ping", function (req, res, next) {
  res.send("pong");
});

// router.get("/:producto", async (req, res) => {
//   try {
//     const producto = await getByItem(req.params.producto);
//     if (producto) {
//       res.json(producto)

//     } else {
//       ('este queso no está')
//     }
//   }
//   catch(error) {
//     res.json('Ups algo no fue bien')
//   }
// });
module.exports = router;
