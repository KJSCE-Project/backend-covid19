var express = require('express');
const app = express();

var router = express.Router();
const conn = require('./connect-db');

app.use(express.json());
app.use(express.urlencoded());

router.post('/getProfileDetails', function (req, res) {
    var user_id = req.body[0].user_id;

    var sql = "SELECT * FROM EMPLOYEE WHERE EMPLOYEE_ID = ?";
    conn.query(sql, [user_id], function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.end('<h1>Account not found</h1><button onclick="history.go(-1);">Try again</button>')
        } else {

            var sql = "SELECT * FROM DEPARTMENT WHERE DEPT_ID = ?";
            conn.query(sql, [result[0].DEPT_ID], function (err, dept_result) {
                if (err) throw err;
                if (result.length == 0) {
                    res.end('<h1>Department not found</h1><button onclick="history.go(-1);">Try again</button>')
                } else {
                    res.json({
                        "result": result[0],
                        "department": dept_result[0].DEPT_NAME
                    });
                }
            });
        }

    });
});

router.post('/getPercentage', function (req, res) {
    var user_id = req.body[0].user_id;

    var sql = "SELECT * FROM COVID WHERE EMPLOYEE_ID = ?";
    conn.query(sql, [user_id], function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.end('<h1>Account not found</h1><button onclick="history.go(-1);">Try again</button>')
        } else {
            res.json({
                "result": result[0],
            });
        }

    });
});

router.post('/getEmployees', function (req, res) {
    var sql = `
    SELECT * FROM Covid_19_local.EMPLOYEE 
    INNER JOIN Covid_19_local.DEPARTMENT 
    ON EMPLOYEE.DEPT_ID = DEPARTMENT.DEPT_ID
    INNER JOIN Covid_19_local.COVID 
    ON EMPLOYEE.EMPLOYEE_ID = COVID.EMPLOYEE_ID;
    `;
    conn.query(sql, [], function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.end('<h1>Employees not found</h1><button onclick="history.go(-1);">Try again</button>')
        } else {
            res.json({
                "result": result
            });
        }
    });
});

router.post('/getEmpNumber', function (req, res) {
    var sql = `
    SELECT COUNT(EMPLOYEE_ID) FROM Covid_19_local.EMPLOYEE ;
    `;
    conn.query(sql, [], function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.end('<h1>Employees not found</h1><button onclick="history.go(-1);">Try again</button>')
        } else {
            res.json({
                "result": result
            });
        }
    });
});

router.post('/getDepartments', function (req, res) {
    var sql = `
    SELECT * FROM Covid_19_local.DEPARTMENT ;
    `;
    conn.query(sql, [], function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.end('<h1>Employees not found</h1><button onclick="history.go(-1);">Try again</button>')
        } else {
            res.json({
                "result": result
            });
        }
    });
});

router.post('/getDepartmentDetails', function (req, res) {
    var dept_id = req.body[0].dept_id;

    var sql = `
        SELECT * FROM Covid_19_local.COVID 
        INNER JOIN Covid_19_local.EMPLOYEE 
        ON COVID.EMPLOYEE_ID = EMPLOYEE.EMPLOYEE_ID
        where EMPLOYEE.DEPT_ID=${dept_id};
    `;
    conn.query(sql, [], function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.end('<h1>Employees not found</h1><button onclick="history.go(-1);">Try again</button>')
        } else {
            res.json({
                "result": result
            });
        }
    });
});

module.exports = router; 