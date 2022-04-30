const host = 'http://127.0.0.1:3000';
const api = '/api/v1';
path = host + api;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
if (document.cookie.indexOf('user_id') == -1 && document.cookie.indexOf('admin_login') == -1) {
    window.location.href = "http://127.0.0.1:5500/views/login.html";
}
if (document.cookie.indexOf('user_id') != -1) {
    $('#dashboard').hide();
    $('#profile').show();
    $('#user_table').show();
    $('#register').hide();
    $('#health_status').show();
} else {
    $('#dashboard').show();
    $('#profile').hide();
    $('#user_table').show();
    $('#register').show();
    $('#health_status').hide();

}

$.ajax({
    url: path + "/getEmployees",
    type: "post",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
        var result = response.result
        console.log(result.length)
        result.forEach(row => {
            $('#emp_table').append(`
            <tr>
                <td>${row.FIRST_NAME} ${row.LAST_NAME}</td>
                <td>${row.POSITION}</td>
                <td>${row.DEPT_NAME}</td>
                <td>${row.AGE}</td>
                <td>2022/11/28</td>
                <td class="">${row.PERCENTAGE}</td>
            </tr>            
            `)
        });
    }
});