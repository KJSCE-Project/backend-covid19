var mysql = require("mysql2");

var conn = mysql.createConnection({
    host: "localhost",
    user: "abhirajkale",
    password: "abhirajkale",
    database: "Covid_19_local"
});

conn.connect((err) => {
    if (err) {
      console.log("Error occurred", err);
    } else {
      console.log("Connected to MySQL Server");
    }
});

module.exports = conn;