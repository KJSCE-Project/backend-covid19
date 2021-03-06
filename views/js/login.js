const host = 'http://127.0.0.1:3000';
const api = '';

const path = host + api;

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  if (document.cookie.indexOf('user_id') != -1 ) {
    window.location.href = "http://127.0.0.1:5500/views/profile.html";
  }
  if (document.cookie.indexOf('admin_login') != -1 ) {
    window.location.href = "http://127.0.0.1:5500/views/index.html";
  }
function loginUser(e){
    const email = document.getElementById('user_email').value;
    const password = document.getElementById('user_password').value;
    
    if(!validateEmail(email)) return false;
    
    
    // API call
    // $.ajax({
    //     type: "POST",
    //     url: path + "/login",
    //     contentType: 'application/json', 
    //     data: JSON.stringify({
    //         email: email,
    //         password: password
    //     }),
    //     success: function (response) {
    //         console.log(response);
    //     }
    // });
    // return false;
}