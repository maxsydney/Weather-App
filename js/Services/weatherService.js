angular.module('myApp')
  .factory('weather', function($http) {

    var APP_ID = "8b7661be7bbdbfb1004eb364dd045ab6";

    function updateByCity(city) {
    url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appID=" + APP_ID + "&units=metric";
    return url;
    };

    function sendRequest(url) {
      var promise = $http.get(url)
      return promise // Need to add in error handling for failed API call
    };

    function processData(data) {
      // Processes weather data and creates data object for displaying in view
      weatherData = {}
      weatherData.country = data.city.country
      weatherData.city = data.city.name
      data = data.list
      processed = [];
      for (i = 0; i < data.length; i ++) {
        day = {}
        day.country = weatherData.country
        day.city = weatherData.city
        // Process temperature
        maxTemp = data[i].temp.max
        maxTemp = Math.round(maxTemp * 10) / 10
        day.max = maxTemp
        minTemp = data[i].temp.min
        minTemp = Math.round(minTemp * 10) / 10
        day.min = minTemp
        // Get humidity
        day.humidity = data[i].humidity
        // Get icon
        day.img = data[i].weather[0].icon
        // Get windspeed and direction
        day.windspeed = Math.round(data[i].speed * 3.6)
        direction = data[i].deg
        day.direction = direction_deg(direction)
        // Process Date
        date = data[i].dt
        date = moment.unix(parseInt(date)).format("dddd, Do")
        day.date = date //date
        // Get description
        description = data[i].weather[0].description
        description = description.replace(description[0],description[0].toUpperCase())
        day.description = description
        // Push object to array
        processed.push(day)
      }
      weatherData.data = processed
      return weatherData;
    }

    // Converts wind vector to direction name
    var direction_deg = function (degrees) {
    	var range = 360 / 8;
    	var bottom = 360 - range / 2;
    	var top = (bottom + range) % 360;
    	var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    	for(j in directions) {
    		if (degrees >= bottom && degrees < top) {
    			return directions[j];
    		}
    		bottom = (bottom + range) % 360;
    		top = (top + range) % 360;
    	}
    }

    return {
      updateByCity: updateByCity,
      sendRequest: sendRequest,
      processData: processData
    }
  });
