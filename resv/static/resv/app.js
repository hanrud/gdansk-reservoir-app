$(document).ready(function () {
    var today,
        hour,
        actualHour,
        maxWaterLevel,
        lastMeasurement;
    var hoursArray = [[0, '06:00'], [1, '07:00'], [2, '08:00'], [3, '09:00'], [4, '10:00'], [5, '11:00'], [6, '12:00'], [7, '13:00'], [8, '14:00'], [9, '15:00'], [10, '16:00'], [11, '17:00'], [12, '18:00'], [13, '19:00'], [14, '20:00'], [15, '21:00'], [16, '22:00'], [17, '23:00'], [18, '0:00'], [19, '1:00'], [20, '2:00'], [21, '3:00'], [22, '4:00'], [23, '05:00']];
    var dataArray = [];



    function getToday() {
        var d = new Date(),
            day = d.getDate(),
            month = d.getMonth() + 1,
            year = d.getFullYear();
        
        hour = d.getHours();

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
                        drawChart(res);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }
        }

    }

    function realDataToArray(req) {
        for (var j = 0; j < req.data.length; j++) {
            while (req.data[j][1] !== null) {
                dataArray.push(req.data[j][1]);
                j++;
            }

        }


    }

    function singleData(req) {
        realDataToArray(req);
        var lastMeasurementHour = hoursArray[dataArray.length - 1][1];
        var lastMeasurementMessage;

        for (var i = 0; i < dataArray.length; i++) {
            lastMeasurement = dataArray[i];
        }

        if (lastMeasurement === null) {
            lastMeasurementMessage = 'brak pomiaru';
        } else {
            lastMeasurementMessage = lastMeasurement.toString() + ' m, godzina: ';
        }

        $('#actualLevel').text(lastMeasurementMessage.toString());
        $('#hour').text(lastMeasurementHour);
        liquid();

    }

    function liquid() {

        var actualLevel;

        maxLevel = maxLevel.replace(/,/, '.');
        maxLevel = parseFloat(maxLevel);

        actualLevel = Math.round(lastMeasurement / maxLevel * 100);

        var gauge1 = loadLiquidFillGauge("fillgauge1", actualLevel);
        var config1 = liquidFillGaugeDefaultSettings();
        config1.circleColor = "#FF7777";
        config1.textColor = "#FF4444";
        config1.waveTextColor = "#FFAAAA";
        config1.waveColor = "#FFDDDD";
        config1.circleThickness = 0.1;
        config1.textVertPosition = 0.2;
        config1.waveAnimateTime = 500;
    }

    function drawChart(req) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var labelsArray = [];


        for (var i = 0; i < hoursArray.length; i++) {
            labelsArray.push(hoursArray[i][1]);
        }

        var minValue = Math.max.apply(null, dataArray);
        var maxValue = Math.min.apply(null, dataArray);
        minValue = parseFloat((minValue - 0.4).toFixed(1));
        maxValue = parseFloat((maxValue + 0.4).toFixed(1));
        console.log(minValue, maxValue);
        console.log(dataArray);

        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelsArray,
                datasets: [{
                    label: "poziom wody [m]",
                    borderColor: 'rgb(255, 99, 132)',
                    data: dataArray,
        }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: maxValue,
                            min: minValue,
                        },
                        position: 'right'

            }]
                },
                legend: {
                    position: 'bottom',
                    fontSize: 14
                }
            }
        });

    }



});
