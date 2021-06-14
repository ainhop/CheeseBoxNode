var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/recetas', function(req, res, next) {
  res.render('Todas las recetas');
  console.log('hasta aqui llego')
});

module.exports = router;
