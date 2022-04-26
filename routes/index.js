var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end(`This is the API for Employee Covid 19 Detection.\nPlease use the path api/v1/ to access the current API.
  `);
});

module.exports = router;
