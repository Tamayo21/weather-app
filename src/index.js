// date

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

// handle images

function displayImage(icon) {
  let iconPath = "";
  if (icon === `01d`) {
    iconPath = "images/01d.svg";
  } else if (icon === `01n`) {
    iconPath = "images/01n.svg";
  } else if (icon === `02d`) {
    iconPath = "images/02d.svg";
  } else if (icon === `02n`) {
    iconPath = "images/02n.svg";
  } else if (icon === `03d` || icon === `03n`) {
    iconPath = "images/03d.svg";
  } else if (icon === `04d` || icon === `04n`) {
    iconPath = "images/04d.svg";
  } else if (icon === `09d` || icon === `09n`) {
    iconPath = "images/09d.svg";
  } else if (icon === `10d`) {
    iconPath = "images/10d.svg";
  } else if (icon === `10n`) {
    iconPath = "images/10n.svg";
  } else if (icon === `11d`) {
    iconPath = "images/11d.svg";
  } else if (icon === `11n`) {
    iconPath = "images/11n.svg";
  } else if (icon === `13d`) {
    iconPath = "images/13d.svg";
  } else if (icon === `13n`) {
    iconPath = "images/13n.svg";
  } else if (icon === `50d`) {
    iconPath = "images/50d.svg";
  } else if (icon === `50n`) {
    iconPath = "images/50n.svg";
  } else {
    iconPath = "images/01d.svg";
  }

  return iconPath;
}

// forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forcast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row row-cols-2 row-cols-sm-2 row-cols-md-6 g-2">`;
  forcast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-sm-2">
        <div class="card day-card">
          <div class="card-body">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <div class="weather-icons">
            <img
            src="${displayImage(forecastDay.weather[0].icon)}"
          alt=""
          width="70"
          />
          </div>
            <div class="weather-forecast-temperatures">
              <p class="card-text temp">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°C</span>  | 
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°C</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//current weather

function showLocationTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let showTemperature = document.querySelector("span.temperature");
  let showLocation = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");
  let iconResponse = response.data.weather[0].icon;

  showTemperature.innerHTML = temperature;
  showLocation.innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute("src", displayImage(iconResponse));
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "fe028dd951e1dd63d22f0a02e9c65071";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocationTemperature);
}

searchCity("Yokohama");

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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("span.temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("span.temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
