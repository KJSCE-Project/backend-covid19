const host = 'http://127.0.0.1:3000';
const api = '/api/v1';
path = host + api;

if (document.cookie.indexOf('admin_login') == -1) {
    window.location.href = "http://127.0.0.1:5500/views/login.html";
}

function changeChart(ele){
    var id = $(ele).attr("id");
    var dept = $(ele).html();

    $('#heading_chart').html(`Department Wise Zone Distribution (${dept})`);
    $.ajax({
        url: path + "/getDepartmentDetails",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify([
            { dept_id: id},
        ]),
        async: false,
        success: function (response) {
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
            console.log(response.result)
            var result = response.result
            
            var red = 0, yellow = 0, green = 0;
            result.forEach(row => {
                percentage = row.PERCENTAGE;
                if (percentage > 70) red++;
                else if (percentage > 40) yellow++;
                else green++;

                if(row.TEMP > 99) hashMap.temp++;
                if(row.SHORT_BREATH =='Y') hashMap.short_breath++;
                if(row.DRY_COUGH =='Y') hashMap.dry_cough++;
                if(row.CHEST_PAIN =='Y') hashMap.chest_pain++;
                if(row.FATIGUE =='Y') hashMap.fatigue++;
                if(row.BODY_PAIN =='Y') hashMap.body_pain++;
                if(row.TIREDNESS =='Y') hashMap.tiredness++;   
            });
    
            let sortable = [];
            for (var vehicle in hashMap) {
                sortable.push([vehicle, hashMap[vehicle]]);
            }

            sortable.sort(function(a, b) {
                return a[1] - b[1];
            });
            console.log(sortable)

            var tot = red + green + yellow;

            $('#symptoms_list').html('');
            sortable.reverse().forEach(key=>{
                obj = (""+Object.values(symptoms[key[0]])).replace(/,/g, '');
                
                symp_per = (key[1]/tot)*100;
                symp_per = Math.round(symp_per * 10) / 10;
                $('#symptoms_list').append(`
                <h4 class="small fw-bold">${obj}<span class="float-end">${symp_per}%</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar bg-primary bg-gradient" aria-valuenow="${symp_per}%" aria-valuemin="0"
                        aria-valuemax="100" style="width: ${symp_per}%;"><span
                            class="visually-hidden">${symp_per}</span></div>
                </div>
                `)
            });
            
            red_per = (red / tot) * 100;
            yellow_per = (yellow / tot) * 100;
            green_per = (green / tot) * 100;
    
            var ctx = document.getElementById("myChart");

        var myDoughnutChart = new Chart(ctx, {
            "type": "doughnut",
            "data": {
                "labels": [
                    "Red Zone",
                    "Green Zone",
                    "Yellow Zone"
                ],
                indexLabel: "#percent%",
                percentFormatString: "#0.##",
                toolTipContent: "{y} (#percent%)",
                "datasets": [
                    {
                        "label": "",
                        "backgroundColor": [
                            "red",
                            "green",
                            "yellow"
                        ],
                        "borderColor": [
                            "#ffffff",
                            "#ffffff",
                            "#ffffff"
                        ],
                        "data": [
                            red_per,
                            yellow_per,
                            green_per
                        ]
                    }
                ]
            },
            "options": {
                "maintainAspectRatio": false,
                "legend": {
                    "display": false,
                    "labels": {
                        "fontStyle": "normal"
                    }
                },
                "title": {
                    "fontStyle": "normal"
                },
                tooltips: {
                    callbacks: {
                      label: function(tooltipItem, data) {
                        //get the concerned dataset
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                          return previousValue + currentValue;
                        });
                        //get the current items value
                        var currentValue = dataset.data[tooltipItem.index];
                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                        var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                  
                        return percentage + "%";
                      }
                    }
                  } 
            }
        });

            // $('#emp_chart')
            //     .html(`<div class="chart-area"><canvas data-bss-chart="{&quot;type&quot;:&quot;doughnut&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;Red Zone&quot;,&quot;Green Zone&quot;,&quot;Yellow Zone&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;&quot;,&quot;backgroundColor&quot;:[&quot;red&quot;,&quot;green&quot;,&quot;yellow&quot;],&quot;borderColor&quot;:[&quot;#ffffff&quot;,&quot;#ffffff&quot;,&quot;#ffffff&quot;],&quot;data&quot;:[&quot;${red_per}&quot;,&quot;${green_per}&quot;,&quot;${yellow_per}&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false,&quot;labels&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}},&quot;title&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}}}"></canvas></div>`)
        }
    });
}

$.ajax({
    url: path + "/getDepartments",
    type: "post",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
        console.log(response)
        var result = response.result;
        result.forEach(row => {
            $('#dept_row').append(`
            <div class="col-lg-6 mb-4">
            <div class="card textwhite bg-primary text-white shadow" button>
                    <div class="card-body">
                        <p style='cursor: pointer' class="m-0" onclick="changeChart(this)" id="${row.DEPT_ID}">${row.DEPT_NAME}</p>
                        <p class="text-white-50 small m-0"></p>
                    </div>
                </div>
            </div>
            `)

        });
    }
});

function getEmployees(){
    $('#heading_chart').html(`Employee Wise Zone Distribution`);

    $.ajax({
        url: path + "/getEmployees",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
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
            var result = response.result
            $('#head-count').html(result.length);
            var red = 0, yellow = 0, green = 0;
            result.forEach(row => {
                percentage = row.PERCENTAGE;
                if (percentage > 70) red++;
                else if (percentage > 40) yellow++;
                else green++;

                if(row.TEMP > 99) hashMap.temp++;
                if(row.SHORT_BREATH =='Y') hashMap.short_breath++;
                if(row.DRY_COUGH =='Y') hashMap.dry_cough++;
                if(row.CHEST_PAIN =='Y') hashMap.chest_pain++;
                if(row.FATIGUE =='Y') hashMap.fatigue++;
                if(row.BODY_PAIN =='Y') hashMap.body_pain++;
                if(row.TIREDNESS =='Y') hashMap.tiredness++;    
            });
    
            let sortable = [];
            for (var vehicle in hashMap) {
                sortable.push([vehicle, hashMap[vehicle]]);
            }

            sortable.sort(function(a, b) {
                return a[1] - b[1];
            });
            console.log(sortable)

            var tot = red + green + yellow;

            $('#symptoms_list').html('');
            sortable.reverse().forEach(key=>{
                obj = (""+Object.values(symptoms[key[0]])).replace(/,/g, '');
                
                symp_per = (key[1]/tot)*100;
                symp_per = Math.round(symp_per * 10) / 10;

                $('#symptoms_list').append(`
                <h4 class="small fw-bold">${obj}<span class="float-end">${symp_per}%</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar bg-primary bg-gradient" aria-valuenow="${symp_per}%" aria-valuemin="0"
                        aria-valuemax="100" style="width: ${symp_per}%;"><span
                            class="visually-hidden">${symp_per}</span></div>
                </div>
                `)
            });

            red_per = (red / tot) * 100;
            yellow_per = (yellow / tot) * 100;
            green_per = (green / tot) * 100;
    
            var ctx = document.getElementById("myChart");
    
            var myDoughnutChart = new Chart(ctx, {
                "type": "doughnut",
                "data": {
                    "labels": [
                        "Red Zone",
                        "Green Zone",
                        "Yellow Zone"
                    ],
                    indexLabel: "#percent%",
                    percentFormatString: "#0.##",
                    toolTipContent: "{y} (#percent%)",
                    "datasets": [
                        {
                            "label": "",
                            "backgroundColor": [
                                "red",
                                "green",
                                "yellow"
                            ],
                            "borderColor": [
                                "#ffffff",
                                "#ffffff",
                                "#ffffff"
                            ],
                            "data": [
                                red_per,
                                yellow_per,
                                green_per
                            ]
                        }
                    ]
                },
                "options": {
                    "maintainAspectRatio": false,
                    "legend": {
                        "display": false,
                        "labels": {
                            "fontStyle": "normal"
                        }
                    },
                    "title": {
                        "fontStyle": "normal"
                    },
                    tooltips: {
                        callbacks: {
                          label: function(tooltipItem, data) {
                            //get the concerned dataset
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            //calculate the total of this data set
                            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                              return previousValue + currentValue;
                            });
                            //get the current items value
                            var currentValue = dataset.data[tooltipItem.index];
                            //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                            var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                      
                            return percentage + "%";
                          }
                        }
                      } 
                }
            });
    
            // $('#emp_chart')
            //     .html(`<div class="chart-area"><canvas id="canvas" data-bss-chart="{&quot;type&quot;:&quot;doughnut&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;Red Zone&quot;,&quot;Green Zone&quot;,&quot;Yellow Zone&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;&quot;,&quot;backgroundColor&quot;:[&quot;red&quot;,&quot;green&quot;,&quot;yellow&quot;],&quot;borderColor&quot;:[&quot;#ffffff&quot;,&quot;#ffffff&quot;,&quot;#ffffff&quot;],&quot;data&quot;:[&quot;${red_per}&quot;,&quot;${green_per}&quot;,&quot;${yellow_per}&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:false,&quot;legend&quot;:{&quot;display&quot;:false,&quot;labels&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}},&quot;title&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}}}"></canvas></div>`)
        }
    });
}

getEmployees();