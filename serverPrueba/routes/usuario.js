var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/Usuarios', function(req, res, next) {
  res.render('Usuarios');
});

module.exports = router;
