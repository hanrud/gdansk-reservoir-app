$(document).ready(function () {
    var today;
    var hour;
    var actualHour;
    var maxWaterLevel;
    console.log(name);

    function getToday() {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        hour = d.getHours();
        
        console.log(hour);
        if (day < 10) {
            day = '0' + day;
        }

        if (month < 10) {
            month = '0' + month;
        }
        
        
        return hour, today = year.toString() + '-' + month + '-' + day;
    }

    $.ajax({
        url: 'http://pomiary.gdmel.pl/rest/stations',
        method: 'GET',
        dataType: 'JSON',
        success: function (res) {
            console.log(res);
            getData(res);

        },
        error: function (err) {
            console.log(err)
        }
    });

    function getData(req) {
        for (var i = 0; i < req.data.length; i++) {
            var nameOfReservoir = "Zb. " + name;
            if (req.data[i].name === nameOfReservoir) {
                $.ajax({
                    url: 'http://pomiary.gdmel.pl/rest/measurments/' + req.data[i].no + '/water/' + getToday(),
                    method: 'GET',
                    dataType: 'JSON',
                    success: function (res) {
                        singleData(res);
//                        console.log(res);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }
        }
    }
    
//    function singleData(req) {
//        hour -= 6;
//        console.log(req.data[hour][1]);
//        console.log($('#actualLevel'));
//        
//    }
    
    
});
