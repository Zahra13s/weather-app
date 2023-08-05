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
let apiKey = "14e8acca972d564954ea713302040d4f";

function showweathercondition(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = `${temperature}°C`;

  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}mph`;


  let condition = response.data.weather[0].description;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = condition;


  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feels_like");
  feelsLikeElement.innerHTML = `${feelsLike}°C`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

// Weather API function
function getWeatherData(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showweathercondition);
}

// Search function
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCityText");
  let city = searchInput.value;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;
  getWeatherData(city);
}

let form = document.querySelector("#search-city-icon");
form.addEventListener("click", search);

//geolocation api

function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then((response) => {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    showweathercondition(response);
  });
}

function getCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentLocation);

//temp celcius to farenheit
const temperatureElement = document.getElementById('tempNumber');
const celsiusLink = document.getElementById('celsius');
const fahrenheitLink = document.getElementById('fahrenheit');

celsiusLink.addEventListener('click', convertToCelsius);
fahrenheitLink.addEventListener('click', convertToFahrenheit);

function convertToCelsius() {
  temperatureElement.innerHTML = '17°C';
}

function convertToFahrenheit() {
  const temperature = parseFloat(temperatureElement.innerText);
  const fahrenheit = Math.round((temperature * 9 / 5) + 32);
  temperatureElement.innerHTML = `${fahrenheit}°F`;
}

// Fetch temperature from OpenWeather API
function fetchTemperatureFromAPI() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=YOUR_CITY_NAME&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temperature = Math.round(data.main.temp);
      temperatureElement.innerHTML = `${temperature}°C`;
    })
    .catch(error => console.error('Error fetching temperature:', error));
}

// Call this function to fetch the temperature when the page loads
fetchTemperatureFromAPI();

