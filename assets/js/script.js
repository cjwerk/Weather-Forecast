var apiKey = "60ce7466ebde7b0aecd67dbb4864a061";
var searchBtn = $(".searchBtn");
var searchInput = $(".searchInput");
document.getElementsByClassName(".currentDate").innerHTML = Date();



var cityNameEl= $(".cityName");
var currentDateEl = $(".currentDate");
var weatherIconEl = $(".waetherIcon");
var searchHistoryEl = $(".historyItems");

var tempEl = $(".temp");
var humidityEl = $(".humidity");
var windSpeedEl = $(".windSpeed");
var uvIndexEl = $(".uvIndex");
var cardRow = $(".card-row");

if(JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found")
} else{
    console.log("searchHistory loaded into searchHistoryArr");
    renderSearchHistory();
}