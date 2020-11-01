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

searchBtn.on("click", function(e) {
    e.preventDefault();
    if(searchInput.val()=== "") {
        alert("Wrong city name!")
        return;
    }console.log("clicked")
    getWeather(searchInput.val());
});

$(document).on("click",".historyEntry", function() {
    var thisElement = $(this);
    getWeather(thisElement.text());
})

function renderSearchHistory(cityName) {
    searchHistoryEl.empty();
    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for(var i=0; i < searchHistoryArr.length; i++) {
        var newListItem = $("<li>").attr("class", historyEntry);
        newListItem.text(searchHistoryArr[i]);
        searchHistoryEl.pretend(newListItem);
    }
}