const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// OpenWeather API configuration
const API_KEY = 'd959ce63f2b9c66d55820bb2de1f4c14';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get weather forecast
app.get('/api/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        
        // First, get coordinates for the city
        const geoResponse = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });

        const { lat, lon } = geoResponse.data.coord;

        // Get 7-day forecast using coordinates
        const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                lat: lat,
                lon: lon,
                appid: API_KEY,
                units: 'metric',
                cnt: 56 // 7 days * 8 forecasts per day (every 3 hours)
            }
        });

        // Process the forecast data to get daily forecasts
        const dailyForecasts = processForecastData(forecastResponse.data.list);
        
        res.json({
            city: geoResponse.data.name,
            country: geoResponse.data.sys.country,
            current: {
                temp: geoResponse.data.main.temp,
                feels_like: geoResponse.data.main.feels_like,
                humidity: geoResponse.data.main.humidity,
                description: geoResponse.data.weather[0].description,
                icon: geoResponse.data.weather[0].icon
            },
            forecast: dailyForecasts
        });

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
});

// Function to process forecast data and get daily forecasts
function processForecastData(forecastList) {
    const dailyData = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = {
                date: dayKey,
                day: date.toLocaleDateString('en-US', { weekday: 'long' }),
                temp_min: Infinity,
                temp_max: -Infinity,
                humidity: [],
                descriptions: [],
                icons: []
            };
        }
        
        // Update min/max temperatures
        dailyData[dayKey].temp_min = Math.min(dailyData[dayKey].temp_min, item.main.temp_min);
        dailyData[dayKey].temp_max = Math.max(dailyData[dayKey].temp_max, item.main.temp_max);
        
        // Collect humidity and weather descriptions
        dailyData[dayKey].humidity.push(item.main.humidity);
        dailyData[dayKey].descriptions.push(item.weather[0].description);
        dailyData[dayKey].icons.push(item.weather[0].icon);
    });
    
    // Convert to array and calculate averages
    return Object.values(dailyData).map(day => ({
        ...day,
        humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
        description: day.descriptions[Math.floor(day.descriptions.length / 2)], // Use middle forecast for description
        icon: day.icons[Math.floor(day.icons.length / 2)] // Use middle forecast for icon
    }));
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
