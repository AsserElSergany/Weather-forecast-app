// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const weatherContainer = document.getElementById('weatherContainer');

// Current weather elements
const cityName = document.getElementById('cityName');
const countryName = document.getElementById('countryName');
const currentTemp = document.getElementById('currentTemp');
const currentIcon = document.getElementById('currentIcon');
const currentDescription = document.getElementById('currentDescription');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');

// Forecast elements
const forecastContainer = document.getElementById('forecastContainer');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Handle search functionality
async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    showLoading();
    hideError();
    hideWeatherContainer();
    
    try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

// Fetch weather data from API
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`/api/weather/${encodeURIComponent(city)}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch weather data');
        }
        
        return await response.json();
    } catch (err) {
        if (err.name === 'TypeError') {
            throw new Error('Network error. Please check your connection.');
        }
        throw err;
    }
}

// Display weather data
function displayWeatherData(data) {
    // Display current weather
    cityName.textContent = data.city;
    countryName.textContent = data.country;
    currentTemp.textContent = Math.round(data.current.temp);
    currentIcon.src = `https://openweathermap.org/img/wn/${data.current.icon}@2x.png`;
    currentDescription.textContent = data.current.description;
    feelsLike.textContent = Math.round(data.current.feels_like);
    humidity.textContent = data.current.humidity;
    
    // Display forecast
    displayForecast(data.forecast);
    
    showWeatherContainer();
}

// Display forecast data
function displayForecast(forecast) {
    forecastContainer.innerHTML = '';
    
    forecast.forEach(day => {
        const forecastCard = createForecastCard(day);
        forecastContainer.appendChild(forecastCard);
    });
}

// Create forecast card element
function createForecastCard(day) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    card.innerHTML = `
        <div class="forecast-day">${day.day}</div>
        <img class="forecast-icon" src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="Weather icon">
        <div class="forecast-temp">
            ${Math.round(day.temp_max)}° / ${Math.round(day.temp_min)}°
        </div>
        <div class="forecast-description">${day.description}</div>
        <div class="forecast-humidity">Humidity: ${day.humidity}%</div>
    `;
    
    return card;
}

// Utility functions for showing/hiding elements
function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function showWeatherContainer() {
    weatherContainer.classList.remove('hidden');
}

function hideWeatherContainer() {
    weatherContainer.classList.add('hidden');
}

// Add some nice animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add focus effect to input
    cityInput.addEventListener('focus', () => {
        cityInput.style.transform = 'scale(1.02)';
    });
    
    cityInput.addEventListener('blur', () => {
        cityInput.style.transform = 'scale(1)';
    });
    
    // Add click effect to search button
    searchBtn.addEventListener('mousedown', () => {
        searchBtn.style.transform = 'scale(0.95)';
    });
    
    searchBtn.addEventListener('mouseup', () => {
        searchBtn.style.transform = 'scale(1)';
    });
    
    searchBtn.addEventListener('mouseleave', () => {
        searchBtn.style.transform = 'scale(1)';
    });
    
    // Auto-focus on input when page loads
    cityInput.focus();
});

// Add weather-based background changes (optional enhancement)
function updateBackground(weatherCode) {
    const body = document.body;
    
    // Remove existing weather classes
    body.classList.remove('weather-sunny', 'weather-cloudy', 'weather-rainy', 'weather-snowy');
    
    // Add appropriate weather class based on weather code
    if (weatherCode >= 200 && weatherCode < 300) {
        body.classList.add('weather-stormy');
    } else if (weatherCode >= 300 && weatherCode < 400) {
        body.classList.add('weather-rainy');
    } else if (weatherCode >= 500 && weatherCode < 600) {
        body.classList.add('weather-rainy');
    } else if (weatherCode >= 600 && weatherCode < 700) {
        body.classList.add('weather-snowy');
    } else if (weatherCode >= 700 && weatherCode < 800) {
        body.classList.add('weather-cloudy');
    } else if (weatherCode === 800) {
        body.classList.add('weather-sunny');
    } else if (weatherCode > 800) {
        body.classList.add('weather-cloudy');
    }
}
