var express = require('express');
const app = express();

var router = express.Router();
const connection = require('./connect-db');

app.use(express.json());      
app.use(express.urlencoded());

router.post('/login', (req, res)=>{
    const email = req.body.user_email;
    const password = req.body.user_password;

    res.end(email + password)
})

module.exports = router; 