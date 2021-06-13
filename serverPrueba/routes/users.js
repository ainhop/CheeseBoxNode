var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// var express = require("express");
// var router = express.Router();

// /* GET home page. */
// router.get("/Usuarios", function (req, res, next) {
//   res.render("Usuarios");
// });

// module.exports = router;
