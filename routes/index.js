var express = require('express');
const app = express();

var router = express.Router();
const conn = require('./connect-db');

app.use(express.json());      
app.use(express.urlencoded());

router.post('/login', (req, res)=>{
    const email = req.body.user_email;
    const password = req.body.user_password;

    var sql = "SELECT * FROM EMPLOYEE WHERE email = ? AND password = ?";
    conn.query(sql, [email, password], function (err, result) {
        if (err) throw err;
        if(result.length==0){
            res.end('<h1>Account not found</h1><button onclick="history.go(-1);">Try again</button>')
        }else{
            res.json(result)
        }
            
    });
})

router.post('/adminLogin', (req, res)=>{
  const user = req.body.admin_user;
  const password = req.body.admin_password;

  if(user == "admin" && password=="admin"){
    res.redirect('http://127.0.0.1:5500/views/index.html');
  }else{
    res.end('<h1>Account not found</h1><button onclick="history.go(-1);">Try again</button>')
  }
})

router.post('/register', (req, res)=>{
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var gender = req.body.gender;
  var email = req.body.email;
  var age = req.body.age;
  var password = req.body.password;
  var department = req.body.department;
  var Position = req.body.Position;
  
  var sql = "SELECT DEPT_ID FROM DEPARTMENT WHERE DEPT_NAME='"+department+"'";
    conn.query(sql, [department], function (err, result) {
        if (err) throw err;
        if(result.length==0){
            res.end('<h1>Department not found</h1><button onclick="history.go(-1);">Try again</button>')
        }else{
          var sql = "INSERT INTO EMPLOYEE (EMAIL, FIRST_NAME, LAST_NAME, GENDER, PASSWORD, DEPT_ID, AGE, POSITION) VALUES ?";
          var values = [
            [email, first_name, last_name, gender, password, 2, age, Position],
          ];
          conn.query(sql, [values], function (err, result) {
            if (err) {
              res.send(err)
              throw err
            };
            res.json(result)
          });
        }
            
    });

})

module.exports = router;
