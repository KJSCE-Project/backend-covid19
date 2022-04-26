var mysql = require("mysql2");

var connection = mysql.createConnection({
    host: "localhost",
    user: "abhirajkale",
    password: "abhirajkale",
    database: "Covid_19_local"
});

connection.connect((err) => {
    if (err) {
      console.log("Error occurred", err);
    } else {
      console.log("Connected to MySQL Server");
    }
});

module.exports = connection;