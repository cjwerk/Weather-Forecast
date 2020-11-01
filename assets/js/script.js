var apiKey = "60ce7466ebde7b0aecd67dbb4864a061";
var searchBtn = $(".searchBtn");
var searchInput = $(".searchInput");
document.getElementsByClassName(".currentDate").innerHTML = Date();



var cityNameEl = $(".cityName");
var currentDateEl = $(".currentDate");
var weatherIconEl = $(".waetherIcon");
var searchHistoryEl = $(".historyItems");

var tempEl = $(".temp");
var humidityEl = $(".humidity");
var windSpeedEl = $(".windSpeed");
var uvIndexEl = $(".uvIndex");
var cardRow = $(".card-row");

if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
} else {
    console.log("searchHistory loaded into searchHistoryArr");
    renderSearchHistory();
}

searchBtn.on("click", function (e) {
    e.preventDefault();
    if (searchInput.val() === "") {
        alert("Wrong city name!")
        return;
    } console.log("clicked")
    getWeather(searchInput.val());
});

$(document).on("click", ".historyEntry", function () {
    var thisElement = $(this);
    getWeather(thisElement.text());
})

function renderSearchHistory(cityName) {
    searchHistoryEl.empty();
    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (var i = 0; i < searchHistoryArr.length; i++) {
        var newListItem = $("<li>").attr("class", historyEntry);
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.pretend(newListItem);
    }
}

function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
    cityNameEl.text(cityName)
    currentDateEl.text
    tempEl.text(`Temperature: ${cityTemp}°F`);
    humidityEl.text(`Humidity: ${cityHumidity}%`);
    windSpeedEl.text(`Wind Speed: ${cityWindSpeed}MPH`);
    uvIndexEl.text(`UV Indext: ${uvVal}`);
    weatherIconEl.attr("src", cityWeatherIcon);
}

function getWeather(desired) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (weatherData) {
            var cityObj = {
                cityName: weatherData.name,
                cityTemp: weatherData.main.temp,
                cityHumidity: weatherData.main.humidity,
                cityWindSpeed: weatherData.wind.speed,
                cityUVIndex: weatherData.coord,
                cityWeatherIconName: weatherData.weather[0].icon
            }

            var queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`
            $.ajax({
                url: queryUrl,
                method: 'GET'
            })
                .then(function (uvData) {
                    if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
                        var searchHistoryArr = [];
                        if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                            searchHistoryArr.push(cityObj.cityName);
                            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                            var renderWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                            renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderWeatherIcon, uvData.value);

                        }
                    } else {
                        var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
                        if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                            searchHistoryArr.push(cityObj.cityName);
                            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                            var renderWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                            renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                            renderSearchHistory(cityObj.cityName);
                        } else {
                            var renderWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
                            renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
                        }
                    };
                });
        });


    getFiveDayForecast();

    function getFiveDayForecast() {
        cardRow.empty();
        var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (fiveDayResponse) {
                for (var i = 0; i != fiveDayResponse.list.length; i + 8) {
                    var cityObj = {
                        date: fiveDayResponse.list[i].dt_txt,
                        icon: fiveDayResponse.list[i].weather[0].icon,
                        temp: fiveDayResponse.list[i].main.temp,
                        humidity: fiveDayResponse.list[i].main.humidity
                    }
                    var dateStr = cityObj.date;
                    var trimmedDate = dateStr.substring(0, 10);
                    var weatherIcon = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
                    createForecastCard(trimmedDate, weatherIcon, cityObj.temp, cityObj.humidity);
                }
            })
    }
}

function createForecastCard(date, icon, temp, humidity) {

    var fiveDayCardEl = $("<div>").attr("class", "five-day-card");
    var cardDate = $("<h3>").attr("class", card-text);
    var cardIcon = $("<img>").attr("class", weatherIcon);
    var cardTemp = $("<p>").attr("class", "card-text");
    var cardHumidity = $("<p>").attr("class", "card-text");

    cardRow.append(fiveDayCardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text(`Temp: ${temp} °F`);
    cardHumidity.text(`Humidity: ${humidity}%`);
    fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
}