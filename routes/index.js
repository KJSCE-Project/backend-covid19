var express = require('express');
const res = require('express/lib/response');
const app = express();

var router = express.Router();
const conn = require('./connect-db');

app.use(express.json());
app.use(express.urlencoded());

router.post('/login', (req, res) => {
  const email = req.body.user_email;
  const password = req.body.user_password;

  var sql = "SELECT * FROM EMPLOYEE WHERE email = ? AND password = ?";
  conn.query(sql, [email, password], function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.end('<h1>Account not found</h1><button onclick="history.go(-1);">Try again</button>')
    } else {
      res.cookie("user_id", result[0].EMPLOYEE_ID);
      res.redirect('http://127.0.0.1:5500/views/profile.html');
    }

  });
})

router.post('/adminLogin', (req, res) => {
  const user = req.body.admin_user;
  const password = req.body.admin_password;

  if (user == "admin" && password == "admin") {
    res.cookie("admin_login", true);
    res.redirect('http://127.0.0.1:5500/views/index.html');
  } else {
    res.end('<h1>Account not found</h1><button onclick="history.go(-1);">Try again</button>')
  }
})

router.post('/register', (req, res) => {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var gender = req.body.gender;
  var email = req.body.email;
  var age = req.body.age;
  var password = req.body.password;
  var department = req.body.department;
  var Position = req.body.Position;

  var sql = "SELECT DEPT_ID FROM DEPARTMENT WHERE DEPT_NAME='" + department + "'";
  conn.query(sql, [department], function (err, result) {
    if (err) throw err;
    if (result.length == 0) {
      res.end('<h1>Department not found</h1><button onclick="history.go(-1);">Try again</button>')
    } else {
      var sql = "INSERT INTO EMPLOYEE (EMAIL, FIRST_NAME, LAST_NAME, GENDER, PASSWORD, DEPT_ID, AGE, POSITION) VALUES ?";
      console.log(result[0])
      var values = [
        [email, first_name, last_name, gender, password, result[0].DEPT_ID, age, Position],
      ];
      conn.query(sql, [values], function (err, result) {
        if (err) {
          res.send(err)
          throw err
        };
        if(result.affectedRows == 1){
          var sql = "SELECT EMPLOYEE_ID FROM EMPLOYEE WHERE EMAIL='" + email + "' AND PASSWORD='" + password + "'";
          conn.query(sql, [], function (err, result) {
              if (result.length > 0) {
                console.log('in')
                var sql = "INSERT INTO COVID (EMPLOYEE_ID, SHORT_BREATH, DRY_COUGH, TEMP, FATIGUE, CHEST_PAIN, BODY_PAIN, TIREDNESS, PERCENTAGE) VALUES ?";
                var values = [
                  [result[0].EMPLOYEE_ID, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 0],
                ];
                conn.query(sql, [values], function (err, result) {
                  if (err) {
                    res.send(err)
                    throw err
                  };
                  if (result.affectedRows == 1)
                    res.redirect("http://127.0.0.1:5500/views/profile.html");
                  else res.json(result)
                });
              }
              else res.json(result.affectedRows);            
          })
        }
      });
    }
  });

})
var get_cookies = function (request) {
  var cookies = {};
  request.headers && request.headers.cookie.split(';').forEach(function (cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[parts[1].trim()] = (parts[2] || '').trim();
  });
  return cookies;
};
router.post('/healthStatus', (req, res) => {
  var chest_pain = req.body.chest_pain;
  var fatigue = req.body.fatigue;
  var temp = req.body.temp;
  var short_breath = req.body.short_breath;
  var cough = req.body.cough;
  var pain = req.body.pain;
  var tiredness = req.body.tiredness;

  var employee_id = parseInt(get_cookies(req)['user_id']);

  var sql = `UPDATE COVID SET SHORT_BREATH = '${short_breath}',  DRY_COUGH ='${cough}',  TEMP = '${temp}',  FATIGUE = '${fatigue}',  CHEST_PAIN = '${chest_pain}',  BODY_PAIN = '${pain}', TIREDNESS = '${tiredness}' WHERE EMPLOYEE_ID = ${employee_id};`;
  console.log(sql)
  var values = [
    [short_breath, cough, temp, fatigue, chest_pain, pain, tiredness, employee_id],
  ];
  conn.query(sql, [values], function (err, result) {
    if (err) {
      res.send(sql)
      throw err
    };
    if (result.affectedRows == 1)
      res.redirect("http://127.0.0.1:5500/views/profile.html");
    else res.json(result)
  });
})

module.exports = router;
