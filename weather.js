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
date_time.innerHTML = `${date}/${month}/${currentYear} ${day}`;

let time = document.querySelector("#time");
time.innerHTML = `${current.toLocaleTimeString()}`;


//To change celsius
function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNumber");
  let fahrenheitTemperature = (celsiusTemp * 9 / 5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;

//weather api  
let apiKey = "14e8acca972d564954ea713302040d4f";

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = `${temperature}°C`;
}

// Weather API function
function getWeatherData(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

// Search function
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCityText");
  let city = searchInput.value; // Get the value from the input field
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city; // Update the city display
  getWeatherData(city); // Fetch weather data for the given city
}

let form = document.querySelector("#search-city-icon");
form.addEventListener("click", search);

//geolocation api

function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then((response) => {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    showTemperature(response);
  });
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentLocation);
