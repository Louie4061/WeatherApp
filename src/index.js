import express, { json } from 'express'; // Req and Res were just types
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { getTemperature } from './routes/weather.js'; // Import the function from weather.js
import { fileURLToPath } from 'url';
import { getData } from './data.js'; // Import the function from data.js
import { get } from 'http';
// const sqlite3 = require('sqlite3').verbose();

// // Connect to the database
// const db = new sqlite3.Database('../intro.db');

// Set up web app
const app = express();

// Use middleware to parse JSON body
app.use(express.json());

// Allow access from other domains (CORS)
app.use(cors());

// Log requests to the console
app.use(morgan('dev'));


// Redirect root to API docs
const __filename = fileURLToPath(import.meta.url); // converts a file URL to a path
const __dirname = path.dirname(__filename);        // gets the directory of that file

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) :  3000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'))
});

app.get('/weatherDisplay.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/weatherDisplay.html'))
});

app.get('/api/data', (req, res) => {
  console.log(getData());
  res.status(200).json({ data: getData() });
});

// these get the lat and long from the user
app.post('/api/latitude', (req, res) => {
  const { latitude }  = req.body;
  console.log(req.body);
  console.log(latitude);

  if (latitude < -90 || latitude > 90) {
    return res.status(400).json({ error: 'Invalid latitude' });
  }

  const data = getData();
  data['latitude'] = latitude;

  res.status(200).json({ latitude: latitude });
});

app.post('/api/longitude', (req, res) => {
  const { longitude } = req.body;
  console.log(longitude);

  if (longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: 'Invalid longitude' });
  }

  const data = getData();
  data['longitude'] = longitude;
  res.status(200).json({ longitude: longitude });
});

app.post('/api/weather', async (req, res) => {
  console.log('Is this called')

  console.log(req.body);
  // we might want to use onecall instead of weather
  const { latitude, longitude } = req.body;
  const result = await getTemperature(latitude, longitude);
  if (result.error) {
    return res.status(500).json({ error: result.error });
  } else {
    console.log(result);
    return res.status(200).json({ temperature: result.temp });
  }
});