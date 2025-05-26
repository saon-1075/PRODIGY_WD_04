const apiKey = "6067cedf4c0049a806cac0d1ed77e4c0";

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  console.log("Request URL:", url); // Debug
  fetchWeather(url);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      console.log("Location URL:", url); // Debug
      fetchWeather(url);
    },
    () => {
      alert("Unable to retrieve your location");
    }
  );
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Weather not found (code ${response.status})`);
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(err => {
      document.getElementById("weather").innerHTML = `<p>${err.message}</p>`;
    });
}

function displayWeather(data) {
  const weatherBox = document.getElementById("weather");
  weatherBox.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temperature: ${data.main.temp} °C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
  `;
}
