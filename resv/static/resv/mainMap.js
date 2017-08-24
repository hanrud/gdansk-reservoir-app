function initMap() {
    var lat, long;
    var resultGeo = [];
    var markersArray = [];
    //    console.log(resvAll);

    for (var i = 0; i < resvAll.length; i++) {
        lat = parseFloat(resvAll[i][0] + '.' + resvAll[i][1]);
        long = parseFloat(resvAll[i][2] + '.' + resvAll[i][3]);
        name = resvAll[i][4];
        url = 'http://localhost:8000/details/' + (i + 1) + '/';
        //        console.log(url);
        resultGeo.push([lat, long, name, url]);
    }
    console.log(resultGeo);

    var gdansk = {
        lng: 18.64,
        lat: 54.35
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: gdansk
    });



    for (var j = 0; j < resultGeo.length; j++) {
        var resPos = {
            lng: resultGeo[j][1],
            lat: resultGeo[j][0]
        };

        

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: resPos,
            url: resultGeo[j][3],
            title: 'Zbiornik ' + resultGeo[j][2],
            map: map
        });
        
        var contentString = '<p><a href =>' + url + '</a></p>' ;

       
    }
     marker.addListener('click', function () {
            infowindow.open(map, marker);
        });



    //        console.log(marker);
    //        
    //        markersArray.push([marker, marker.url]);
}
//        console.log(marker);
//        console.log(markersArray);

//    for (var k = 0; k < markersArray.length; k++) {
//          google.maps.event.addListener(markersArray[0], 'click', function () {
////        for (var k = 0; k < markersArray.length; k++) {
////            if (marker === markersArray[k][0]) {
//                window.location.href = markersArray[k][1];            
//            });
//    }


//        
//        }

//    });

//}
