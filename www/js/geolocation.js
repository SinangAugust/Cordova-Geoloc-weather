document.getElementById("getPosition").addEventListener("click", getPosition);

function getPosition()
{
    document.getElementById("getcontainer").style.display = 'block';
    var options = {enableHighAccuracy: true, maximumAge: 3600000};
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    function onSuccess(position)
    {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var openWeatherAppKey = "380b0e5b293d08a28c9d2d98d4aa4f77";
        if(!position.coords.latitude){document.getElementById("latitude").textContent = 'null';}
        else{document.getElementById("latitude").textContent = position.coords.latitude;}

        if(!position.coords.longitude){document.getElementById("longitude").textContent = 'null';}
        else{document.getElementById("longitude").textContent = position.coords.longitude;}

        var queryString =
        'https://api.openweathermap.org/data/2.5/weather?lat='
        + latitude + '&lon=' + longitude + '&appid=' + openWeatherAppKey + '&units=metric';
        $.getJSON(queryString, function (results) {
            if (results.weather.length) {
                $.getJSON(queryString, function (results) {
                    if (results.weather.length) {
                        $('#location').text(results.name);
                    }
                });
            }
        }).fail(function () {
            console.log("error getting location");
        });
    }
    
    function onError(error)
    {
        alert('code: ' + error.code + '\n' + 'message: ' + error.message);
    }
}