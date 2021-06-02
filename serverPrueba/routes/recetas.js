var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/recetas', function(req, res, next) {
  res.render('Todas las recetas');
});

module.exports = router;
