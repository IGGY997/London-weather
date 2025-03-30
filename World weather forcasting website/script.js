// Modal (Welcome) Logic
const modal = document.getElementById("welcomeModal");
const closeModal = document.getElementsByClassName("close")[0];

// Open Modal on Page Load
window.onload = function() {
    modal.style.display = "block";
}

// Close Modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Weather API Integration
function getWeather() {
    const locationInput = document.getElementById("location-input").value;
    if (!locationInput) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = '95114a6ad430acedb2f7293fef9e0972'; // Use your OpenWeather API key
    const apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={95114a6ad430acedb2f7293fef9e0972}";
    const url = `${apiBaseUrl}?q=${locationInput}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert(`Error: ${data.message}`);
                return;
            }
            updateWeatherInfo(data);
        })
        .catch(error => console.log("Error fetching weather data:", error));
}

function updateWeatherInfo(data) {
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("wind-speed");
    const weatherAlertsElement = document.getElementById("weather-alerts");

    locationElement.textContent = data.name;
    temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    if (data.weather && data.weather.length > 0) {
        const alerts = data.weather.map(weather => weather.description).join(", ");
        weatherAlertsElement.textContent = `Conditions: ${alerts}`;
    } else {
        weatherAlertsElement.textContent = "No alerts.";
    }

    // Adding weather icon
    const icon = data.weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

    const weatherIconElement = document.createElement("img");
    weatherIconElement.src = weatherIconUrl;
    weatherIconElement.alt = data.weather[0].description;
    document.getElementById("weather-info").appendChild(weatherIconElement);
}


