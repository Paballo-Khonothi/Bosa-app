function weatherRefresh(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#cityName");
    let desctriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#weather-icon");
    
    
    temperatureElement.innerHTML = Math.round(temperature);
    cityElement.innerHTML = response.data.city;
    desctriptionElement.innerHTML = response.data.condition.desctription;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

    getForecast(response.data.city);

}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day}, ${hours}:${minutes}`;
}
function citySearch(cityName) {
    let apiKey = "94766eobfaf05bat0eead70d35d76438";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(weatherRefresh);
}



function weatherSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter");
  

    citySearch(cityInput.value);

}

function getForecast(city) {
    let apiKey = "94766eobfaf05bat0eead70d35d76438";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);
    let forecastElement = document.querySelector("#forecast");

    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function (day) {

    forecastHtml =  forecastHtml +
    `<div class="forecast-day">
    <div class="forecast-date">${day}</div>
    <div class="forecast-icon">🌞</div>
    <div class="forecast-temps">
    <div class="temp"><strong>15°</strong></div>
    <div class="temp">8°</div>
    </div>
    </div>
`;
    });

    forecastElement.innerHTML = forecastHtml;

}
let searchformElemet = document.querySelector("#search-form");
searchformElemet.addEventListener("submit", weatherSearch);

citySearch("Pretoria");


