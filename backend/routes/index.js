var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express at '+ process.env.BACKEND_SERVICE_HOST });
});

module.exports = router;
