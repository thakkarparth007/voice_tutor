var express = require('express');
var router = express.Router();

/* GET / */
router.get('/', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.end('Hi, user');
});

module.exports = router;
