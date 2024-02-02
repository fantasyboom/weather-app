import React, { useState, useEffect } from "react";
import '../App.css';
import axios from "axios";
import TemperatureDisplay from "./tempdisplay";
import ToggleButton from "./toggleButton";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiShowers, WiFog } from 'react-icons/wi';

// Define the mapping of weather descriptions to SVG icons
const getWeatherIcon = (condition, size = '10x') => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <WiDaySunny size={size} />;
      case 'clouds':
        return <WiCloud size={size} />;
      case 'rain':
        return <WiRain size={size} />;
      case 'snow':
        return <WiSnow size={size} />;
      case 'thunderstorm':
        return <WiThunderstorm size={size} />;
      case 'drizzle':
        return <WiShowers size={size} />;
      case 'fog':
        return <WiFog size={size} />;
      case 'haze':
        // You can choose an appropriate icon for haze, for example, using WiFog for simplicity
        return <WiFog size={size} />;
      default:
        return null;
    }
  };
  

  export default function MainInfoCard({ searchInput,temperatureUnit }) {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
   
    const [weatherCondition, setWeatherCondition] = useState('unknown'); // Declare weatherCondition state
    const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
    const apiHost = process.env.REACT_APP_RAPIDAPI_HOST;
  
    useEffect(() => {
      const fetchData = async () => {
        setError(null);
  
        const options = {
          method: "GET",
          url: `https://open-weather13.p.rapidapi.com/city/${searchInput}`,
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost
          },
          params: {
            unit: temperatureUnit === "C" ? "metric" : "imperial"
          }
        };
  
        try {
          const response = await axios.request(options);
          setWeatherData(response.data);
          const condition = response.data.weather?.[0]?.main || 'unknown';
          setWeatherCondition(condition); // Set the weatherCondition state
        } catch (error) {
          console.error(error);
          if (error.response && error.response.status === 404) {
            setError("City not found. Please enter a valid city name.");
          } else {
            setError("An error occurred. Please try again later.");
          }
        }
      };
  
      if (searchInput) {
        fetchData();
      }
    }, [searchInput, temperatureUnit]);
  
    
  
    const getWeatherIcon = (condition) => {
      switch (condition.toLowerCase()) {
        case 'clear':
          return <WiDaySunny />;
        case 'clouds':
          return <WiCloud />;
        case 'rain':
          return <WiRain />;
        // Add other cases for different weather conditions
        default:
          return null;
      }
    };

    const convertToFahrenheit = (celsius) => ((celsius * 9/5) + 32).toFixed(1);
    const convertToCelsius = (fahrenheit) => (((fahrenheit - 32) * 5/9)).toFixed(1);

  
    return (
      <>
        <div className="m-10 text-white flex flex-col gap-5 justify-center items-center">
          {error ? (
            <p className="text-white">{error}</p>
          ) : weatherData ? (
            <>
              
              <text className="text-3xl font-bold font-sans">
                {weatherData.name || 'CITY NOT FOUND'}
              </text>
              <TemperatureDisplay temperature={temperatureUnit === "F" ? convertToFahrenheit(weatherData.main?.temp) : convertToCelsius(weatherData.main?.temp)} unit={temperatureUnit} textsize={"3xl"} />
              <div className="flex justify-center items-center gap-8">
                <div className="flex justify-center items-center">
                  <p className="text-sm">Min:</p>
                  <TemperatureDisplay temperature={temperatureUnit === "F" ? convertToFahrenheit(weatherData.main?.temp_min) : convertToCelsius(weatherData.main?.temp_min)} unit={temperatureUnit} textsize={"sm"}></TemperatureDisplay>
                </div>
                <div className="flex justify-center items-center">
                  <p className="text-sm">Max:</p>
                  <TemperatureDisplay temperature={temperatureUnit === "F" ? convertToFahrenheit(weatherData.main?.temp_max) : convertToCelsius(weatherData.main?.temp_max)} unit={temperatureUnit} textsize={"sm"}></TemperatureDisplay>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                {getWeatherIcon(weatherCondition)}
                <p className="text-white">{weatherData.weather?.[0]?.description || 'N/A'}</p>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </>
    );
  }
  