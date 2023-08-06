let current = new Date();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const currentYear = current.getFullYear();

let month = months[current.getMonth()];
let date = current.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[current.getDay()];
let hour = current.getHours();
let minute = current.getMinutes();

let date_time = document.querySelector("#date");
date_time.innerHTML = `${date}/${month}/${currentYear} </br> ${day}`;

let time = document.querySelector("#time");
time.innerHTML = `${current.toLocaleTimeString()}`;

//weather api  
function displayForecast(forecastData) {
  let forecast = document.querySelector("#forecast");
  let forecastDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = '';

  forecastData.slice(0, 6).forEach(function (data, index) {
    let day = forecastDay[index];
    let iconUrl = data.condition.icon_url;
    let minTemp = Math.round(data.temperature.minimum);
    let maxTemp = Math.round(data.temperature.maximum);

    forecastHTML += `
      <div class="forecast-item">
        <img src="${iconUrl}" class="forecast-image">
        <p style="font-weight: bolder; font-size: 17px; margin-bottom: 10px;">${day}</p>
        <p>${maxTemp}°C ${minTemp}°C</p>
      </div>
    `;
  });

  forecast.innerHTML = forecastHTML;
}

// Example forecastData
const forecastData = [
  {
    condition: { icon_url: "url_to_weather_icon_1" },
    temperature: { minimum: 18, maximum: 25 }
  },
  // Data for the rest of the days (total 6 days)
];

// Call the function to display the forecast
displayForecast(forecastData);


function showTemperature(response) {
  celsiusTemp = response.data.temperature.current;
  //temp
  let temperature = Math.round(celsiusTemp);
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = `${temperature}°C`;
  //description
  let description = response.data.condition.description.charAt(0).toUpperCase() + response.data.condition.description.slice(1);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  document.querySelector("#city").innerHTML = response.data.city;
  //humidity
  let humidity = Math.round(response.data.temperature.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  //wind
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}mph`;

  //feels like
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let feelsLikeElement = document.querySelector("#feels_like");
  feelsLikeElement.innerHTML = `${feelsLike}°C`;
  //pressure
  let pressure = Math.round(response.data.temperature.pressure);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `${pressure}Pa`;
  //icon
  document.querySelector("#icon").setAttribute("src", response.data.condition.icon_url);

  // Fetch the forecast weather data using the SheCodes API
  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "03aa5321feb0a48eoca7a4tede1f2bb1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-text").value;
  search(city);
}

let searchCity = document.querySelector("#search-city-icon");
searchCity.addEventListener("click", showCity);

let submit = document.querySelector("#submitControl");
submit.addEventListener("submit", showCity);

let searchInput = document.querySelector("#search-city-text");
searchInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    showCity(event);
  }
});

search("Yangon");

function getForecast(city) {
  let apiKey = "0a3a6729o75585fadatfdbb88a4a9a1a";
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(forecastApiUrl)
    .then(function (response) {
      let forecastData = response.data.daily;
      displayForecast(forecastData);
    })
    .catch(function (error) {
      console.log(error);
    });
}


function showCurrent(position) {
  let apiKey = "0a3a6729o75585fadatfdbb88a4a9a1a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrent);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentLocation);

//temp celcius to farenheit
