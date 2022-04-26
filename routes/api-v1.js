var express = require('express');
const app = express();

var router = express.Router();
const conn = require('./connect-db');

app.use(express.json());      
app.use(express.urlencoded());


module.exports = router; 