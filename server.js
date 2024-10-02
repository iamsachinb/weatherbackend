// File: server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // Make sure this doesn't conflict with your React app's port

app.use(cors());
app.use(express.json());

// In-memory database
const weatherData = {
  'New York': { temp: 20, weather: [{ description: 'Cloudy' }] },
  'London': { temp: 15, weather: [{ description: 'Rainy' }] },
  'Tokyo': { temp: 25, weather: [{ description: 'Sunny' }] },
  'Sydney': { temp: 22, weather: [{ description: 'Partly cloudy' }] },
  'Paris': { temp: 18, weather: [{ description: 'Clear sky' }] },
};

app.get('/api/weather', (req, res) => {
  const city = req.query.city;
  if (city && weatherData[city]) {
    res.json({
      name: city,
      main: { temp: weatherData[city].temp },
      weather: weatherData[city].weather,
    });
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

app.post('/api/weather', (req, res) => {
  const { city, temp, description } = req.body;
  if (city && temp && description) {
    weatherData[city] = {
      temp: parseFloat(temp),
      weather: [{ description }],
    };
    res.status(201).json({ message: 'Weather data added successfully' });
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.listen(port, () => {
  console.log(`Local weather API running at http://localhost:${port}`);
});