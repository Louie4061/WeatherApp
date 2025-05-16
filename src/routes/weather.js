import express, { json } from 'express'; // Req and Res were just types
import axios from 'axios';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

// Load API key from .env
const API_KEY = process.env.WEATHER_API_KEY;

export async function getTemperature(latitude, longitude) {
    console.log('API_KEY:', API_KEY);
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall`, {
      params: {
        lat: latitude,
        lon: longitude,
        exclude: 'hourly,daily',
        appid: API_KEY,
      },
    });

    // Axios already gives you a parsed JSON object
    const data = response.data;

    // Convert temperature from Kelvin to Celsius
    const result = {
      temp: data.current.temp - 273.15,
    };

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return { error: 'Could not fetch weather data' };
  }
}