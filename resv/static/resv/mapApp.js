function initMap() {
    lat = lat.replace(/,/, '.');
    lat = parseFloat(lat);

    long = long.replace(/,/, '.');
    long = parseFloat(long);
  
    var resvLocation = {
        //zamienić przy dodawaniu i potem tutaj
        lat: lat,
        lng: long
    }
    var map = new google.maps.Map(document.getElementById('singleMap'), {
        zoom: 15,
        center: resvLocation
    });
    var marker = new google.maps.Marker({
        position: resvLocation,
        map: map
    });
}
