let currentTime = new Date();

function formatDate(date) {
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
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();

  let calendarDate = `${currentMonth} ${currentDate}, ${currentYear}`;

  let today = document.querySelector("#today");
  today.innerHTML = `${calendarDate}`;

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${date.getHours()}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${date.getMinutes()}`;
  }
  let currentDay = days[date.getDay()];

  let formattedDate = `${currentDay}, ${currentHour}:${currentMinute}`;

  let dayAndtime = document.querySelector("#current-time");
  dayAndtime.innerHTML = `${formattedDate}`;
}

console.log(formatDate(currentTime));

function showLocationTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("span.temperature");
  let showLocation = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");

  showTemperature.innerHTML = temperature;
  showLocation.innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchLocation(event) {
  event.preventDefault();
  let location = document.querySelector("#search-text-input").value;
  let apiKey = "fe028dd951e1dd63d22f0a02e9c65071";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndpoint}q=${location}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocationTemperature);
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", searchLocation);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", navigateLoc);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(position);

  let apiKey = "fe028dd951e1dd63d22f0a02e9c65071";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocationTemperature);
}

function navigateLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
