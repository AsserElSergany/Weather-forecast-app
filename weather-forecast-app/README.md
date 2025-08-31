# Weather Forecast App

A beautiful and responsive 7-day weather forecast application built with Node.js, Express, HTML, CSS, and JavaScript. The app uses the OpenWeather API to provide accurate weather information for any city worldwide.

## Features

- 🌍 **Global City Search**: Search for weather in any city around the world
- 🌤️ **Current Weather**: Display current temperature, feels like, humidity, and weather description
- 📅 **7-Day Forecast**: View detailed weather forecasts for the next 7 days
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful gradient backgrounds and smooth animations
- ⚡ **Real-time Data**: Live weather data from OpenWeather API
- 🔍 **Auto-complete**: Press Enter to search quickly

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: OpenWeather API
- **Styling**: CSS Grid, Flexbox, Gradients
- **Icons**: Font Awesome, OpenWeather Icons

## Installation

1. **Clone or download the project files**

2. **Navigate to the project directory**
   ```bash
   cd weather-forecast-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser and visit**
   ```
   http://localhost:3000
   ```

## API Configuration

The app is already configured with the provided OpenWeather API key: `d959ce63f2b9c66d55820bb2de1f4c14`

If you want to use your own API key:
1. Get a free API key from [OpenWeather](https://openweathermap.org/api)
2. Replace the API_KEY in `server.js` line 12

## Project Structure

```
weather-forecast-app/
├── server.js              # Express server and API endpoints
├── package.json           # Project dependencies and scripts
├── README.md             # Project documentation
└── public/               # Frontend files
    ├── index.html        # Main HTML file
    ├── styles.css        # CSS styling
    └── script.js         # Frontend JavaScript
```

## How It Works

1. **User Input**: User enters a city name in the search box
2. **API Call**: The app calls the OpenWeather API to get current weather and coordinates
3. **Forecast Data**: Using the coordinates, it fetches 7-day forecast data
4. **Data Processing**: The server processes the forecast data to get daily summaries
5. **Display**: The frontend displays the weather information in a beautiful, responsive layout

## API Endpoints

- `GET /` - Serves the main HTML page
- `GET /api/weather/:city` - Returns weather data for a specific city

## Features in Detail

### Current Weather Display
- City name and country
- Current temperature in Celsius
- Weather description with icon
- "Feels like" temperature
- Humidity percentage

### 7-Day Forecast
- Day of the week
- Weather icon
- High and low temperatures
- Weather description
- Humidity level

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Troubleshooting

### Common Issues

1. **"City not found" error**
   - Make sure the city name is spelled correctly
   - Try using the full city name (e.g., "New York" instead of "NYC")

2. **Server won't start**
   - Make sure Node.js is installed
   - Check if port 3000 is available
   - Run `npm install` to install dependencies

3. **API errors**
   - Check your internet connection
   - Verify the API key is correct
   - Check if you've exceeded API rate limits

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## License

This project is open source and available under the MIT License.

## Credits

- Weather data provided by [OpenWeather API](https://openweathermap.org/)
- Icons by [Font Awesome](https://fontawesome.com/)
- Weather icons by [OpenWeather](https://openweathermap.org/)
