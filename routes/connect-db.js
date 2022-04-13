const mysql = require('mysql');

function connectDB(){
    const con = mysql.createConnection({
        host: "us-cdbr-east-05.cleardb.net",
        user: "b2de29649f2819",
        password: "243927d3"
    });
    
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to Database.");
    });
}
module.exports = { connectDB }