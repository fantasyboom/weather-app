# Weather App

This project is a weather application that provides current weather information and a 5-day forecast for a given city.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Weather App is built using React and utilizes the OpenWeather API to fetch weather data. It includes a main information card for the current weather, additional information about the city, and a 5-day forecast.

## Features

- Current weather display with temperature, min/max temperatures, and weather description.
- Toggle between Celsius and Fahrenheit.
- 5-day forecast with date, temperature, and weather description.
- Search for a city and get real-time weather information.
- Responsive design for various screen sizes.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app

2. Install the Dependencies:
npm install
# or
yarn

3.To run the application
npm run dev
# or
yarn dev
Visit http://localhost:3000 in your browser.

4. We are using open weather api, we need to have a .env file in our root folder
REACT_APP_RAPIDAPI_KEY=your-api-key
REACT_APP_RAPIDAPI_HOST=open-weather13.p.rapidapi.com

Folder Structure:
/src
  /components
    MainInfoCard.jsx
    AdditionalInfoCard.jsx
    FiveDayCard.jsx
    ToggleButton.jsx
    SearchBar.jsx
    TempDisplay.jsx
  App.jsx
  App.css

## Deployed Link : https://weather-app-mirrar.vercel.app/
