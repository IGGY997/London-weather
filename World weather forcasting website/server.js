const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Set up a route for fetching weather
app.get('/weather', async (req, res) => {
    const location = req.query.location || 'London'; // Default to London if no location is provided
    const apiKey = '95114a6ad430acedb2f7293fef9e0972'; // Use your OpenWeather API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${95114a6ad430acedb2f7293fef9e0972};

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send("Error fetching weather data");
    }
});

// Serve the front-end files
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
