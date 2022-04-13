const mysql = require('mysql');

function connectDB(){
    const con = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password
    });
    
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to Database.");
    });
}
module.exports = { connectDB }