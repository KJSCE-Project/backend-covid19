var express = require('express');
var router = express.Router();
const connection = require('./connect-db');

connection.executeQuery();

router.get('/', (req, res)=>{
    res.end('sample api')
})

module.exports = router; 