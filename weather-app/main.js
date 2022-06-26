// Selecting the DOM Elements
const icon_elm = document.querySelector(".weather-icon");
const temp_elm = document.querySelector(".temperature");
const temp_type = document.querySelector(".weather_type");
const location_elm = document.querySelector(".location_elm");
const min_count = document.querySelector(".min-count");
const max_count = document.querySelector(".max-count");
// search-box
const form = document.querySelector(".search-container");
const search = document.querySelector("#search-bar");
// searchbox configuration

form.addEventListener("submit", (e) => {
  getWeather(search.value);
  e.preventDefault();
});

// Constant and Variables
const key = "c054e72ca194cdbe5cc505d82721c2b5";
const weather = {};
weather.temperature = {
  unit: "celsius",
};

function getWeather(city) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  fetch(api)
    .then((res) => {
      const data = res.json();
      return data;
    })
    .then((data) => {
      console.log(data);
      // storing the value in the object
      weather.iconId = data.weather[0].icon;
      weather.temperature.value = Math.round(data.main.temp);
      weather.weather_type = data.weather[0].description;
      weather.location = data.name;
      weather.min_temp = Math.round(data.main.temp_min);
      weather.max_temp = Math.round(data.main.temp_max);
    })
    .then(() => {
      updateValue();
    });
}

// value update in the html
function updateValue() {
  icon_elm.innerHTML = `<img src="./assets/${weather.iconId}.png" alt="" />`;
  temp_elm.innerHTML = `<div class="temperature">${weather.temperature.value}<span>°c</span></div>`;
  temp_type.innerHTML = weather.weather_type;
  location_elm.innerHTML = weather.location;
  min_count.innerHTML = `<div class="temp-count">${weather.min_temp}<span>°c</span></div>`;
  max_count.innerHTML = `<div class="temp-count">${weather.max_temp}<span>°c</span></div>`;
}
