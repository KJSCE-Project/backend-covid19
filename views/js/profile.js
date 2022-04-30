const host = 'http://127.0.0.1:3000';
const api = '/api/v1';
path = host + api;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

if (document.cookie.indexOf('user_id') == -1) {
    window.location.href = "http://127.0.0.1:5500/views/login.html";
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

        var hashMap = {
            temp: 0,
            short_breath: 0,
            dry_cough: 0,
            chest_pain: 0,
            fatigue: 0,
            body_pain: 0,
            tiredness: 0
        }
        var symptoms = {
            temp: "High Temperature",
            short_breath: "Short Breath",
            dry_cough: "Dry Cough",
            chest_pain: "Chest Pain",
            fatigue: "Fatigue",
            body_pain: "Body Pain",
            tiredness: "Tiredness"
        }
        console.log(response)

        var row = response.result;

        if (row.TEMP > 99) hashMap.temp++;
        if (row.SHORT_BREATH == 'Y') hashMap.short_breath++;
        if (row.DRY_COUGH == 'Y') hashMap.dry_cough++;
        if (row.CHEST_PAIN == 'Y') hashMap.chest_pain++;
        if (row.FATIGUE == 'Y') hashMap.fatigue++;
        if (row.BODY_PAIN == 'Y') hashMap.body_pain++;
        if (row.TIREDNESS == 'Y') hashMap.tiredness++;

        let sortable = [];
            for (var vehicle in hashMap) {
                sortable.push([vehicle, hashMap[vehicle]]);
            }

            sortable.sort(function(a, b) {
                return a[1] - b[1];
            });
            
            $('#symptoms_list').html('');
            sortable.reverse().forEach(key=>{
                obj = (""+Object.values(symptoms[key[0]])).replace(/,/g, '');
                
                symp_per = (key[1]/1)*100;
                symp_per = Math.round(symp_per * 10) / 10;
                
                $('#symptoms_list').append(`
                <h4 class="small fw-bold">${obj}<span class="float-end">${symp_per==100?"Showing Symptom":"No Symptom"}</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar bg-primary bg-gradient" aria-valuenow="${symp_per}%" aria-valuemin="0"
                        aria-valuemax="100" style="width: ${symp_per}%;"><span
                            class="visually-hidden">${symp_per}</span></div>
                </div>
                `);
            });
    }
});