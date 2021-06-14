var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/productos', function(req, res, next) {
  res.render('Todos los productos');
});

module.exports = router;
