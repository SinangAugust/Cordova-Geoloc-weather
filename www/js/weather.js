var watchID = null;

function getWeatherUpdate() {
    navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError, { enableHighAccuracy: true })
}

function onWeatherSuccess(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    var OpenWeatherAppKey = "380b0e5b293d08a28c9d2d98d4aa4f77";

    var queryString = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=metric';
    
    $.getJSON(queryString, function (results) {

        if (results.weather.length) {

            $.getJSON(queryString, function (results) {

                if (results.weather.length) {
                    $('#description').text(results.name);
                    $('#temp').text(results.main.temp);
                    $('#wind').text(results.wind.speed);
                    $('#humidity').text(results.main.humidity);
                    $('#visibility').text(results.visibility);
                    var sunriseDate;
                    if(results.sys.sunrise < 0){
                        sunriseDate = new Date(results.sys.sunrise*1000);
                    }else{
                        sunriseDate = new Date(results.sys.sunrise*1000);
                    }
                    $('#sunrise').text(sunriseDate.toLocaleTimeString());

                    var sunsetDate; 
                    if(results.sys.sunrise < 0){
                        sunsetDate = new Date(results.sys.sunset*1000);
                    }else{
                        sunsetDate = new Date(results.sys.sunset*1000);
                    }
                    $('#sunset').text(sunsetDate.toLocaleTimeString());
                }

            });
        }
    }).fail(function () {
        console.log("error getting location");
    });
}


function onWeatherError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}