var express = require('express');
var router = express.Router();

/* GET / */
router.get('/', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.end('Hi, user');
});


router.post('/', function(req, res, next) {
    console.log(JSON.stringify(req.body));
    res.send("I don't care");
});

module.exports = router;
