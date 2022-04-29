const host = 'http://127.0.0.1:3000';
const api = '/api/v1';
path = host + api;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

$.ajax({
    url: path + "/getProfileDetails",
    type: "post",
    data: JSON.stringify([
        { user_id: getCookie('user_id') },
    ]),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
        console.log(response)
        result = response.result;
        const first_name = result.FIRST_NAME;
        const last_name = result.LAST_NAME;
        const password = result.PASSWORD;
        const email = result.EMAIL;
        const age = result.AGE;
        const position = result.POSITION;
        const department = response.department;
        const user_id = result.EMPLOYEE_ID;

        document.getElementById('first_name').value = first_name;
        document.getElementById('last_name').value = last_name;
        document.getElementById('password').value = password;
        document.getElementById('email').value = email;
        document.getElementById('position').value = position;
        document.getElementById('age').value = age;
        document.getElementById('department').value = department;
        document.getElementById('user_id').innerHTML = "#ID " + user_id;
    }
});
$.ajax({
    url: path + "/getPercentage",
    type: "post",
    data: JSON.stringify([
        { user_id: getCookie('user_id') },
    ]),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
        var percentage = response.result.PERCENTAGE;
        document.getElementById('vulnerability').innerHTML = percentage + "%";
        $('#pg_bar_vul').css("width", percentage + "%");
        if (percentage > 70) {
            $('#zone').addClass('text-danger')
            $('#zone').html('Red Zone')
        } else if (percentage > 40) {
            $('#zone').addClass('text-warning')
            $('#zone').html('Yellow Zone')
        } else {
            $('#zone').addClass('text-success')
            $('#zone').html('Green Zone')
        }
    }
});