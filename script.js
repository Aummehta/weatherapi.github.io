// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Define the OpenWeatherMap API key
    const apiKey = "d811007a67c490bd3aa52a9d6a6a776c";

    // Get references to HTML elements
    const locationInput = document.getElementById("locationInput");
    const searchButton = document.getElementById("searchButton");
    const cityNameElement = document.getElementById("cityName");
    const weatherDescriptionElement = document.getElementById("weatherDescription");
    const temperatureElement = document.getElementById("temperature");
    const minMaxTempElement = document.getElementById("minMaxTemp");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("windSpeed");

    // Add a click event listener to the search button
    searchButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        if (location === "") return;

        // Call the function to fetch weather data
        fetchWeatherData(location);
    });

    // Add a keypress event listener to the location input field
    locationInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const location = locationInput.value.trim();
            if (location === "") return;

            // Call the function to fetch weather data
            fetchWeatherData(location);
        }
    });

    // Function to fetch weather data from OpenWeatherMap API
    async function fetchWeatherData(location) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error("Weather data not found.");
            }

            const data = await response.json();

            // Update weather information in the HTML elements
            cityNameElement.textContent = data.name + ", " + data.sys.country;
            weatherDescriptionElement.textContent = data.weather[0].description;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
            minMaxTempElement.textContent = `Min/Max Temperature: ${data.main.temp_min}°C / ${data.main.temp_max}°C`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            cityNameElement.textContent = "Location not found.";
            clearWeatherData();
        }
    }

    // Function to clear weather data from HTML elements
    function clearWeatherData() {
        weatherDescriptionElement.textContent = "";
        temperatureElement.textContent = "";
        minMaxTempElement.textContent = "";
        humidityElement.textContent = "";
        windSpeedElement.textContent = "";
    }
});
