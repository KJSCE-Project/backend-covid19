const mysql = require('mysql');

// Initialize pool
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "us-cdbr-east-05.cleardb.net",
    user: "b2de29649f2819",
    password: "243927d3",
    database: "heroku_864d8a7fa6a6bdf",
    debug: false
});
exports.executeQuery = function (query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                callback(null, { rows: rows });
            }
        });
        connection.on('error', function (err) {
            throw err;
            return;
        });
    });
}