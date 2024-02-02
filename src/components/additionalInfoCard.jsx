import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';
import TemperatureDisplay from "./tempdisplay";

export default function AdditionalInfoCard({ searchInput }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchInput) {
        // If there's no search input, set weatherData to null or handle accordingly
        setWeatherData(null);
        return;
      }

      const options = {
        method: "GET",
        url: `https://open-weather13.p.rapidapi.com/city/${searchInput}`,
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': apiHost,
        }
      };

      try {
        const response = await axios.request(options);
        setWeatherData(response.data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error(error);
        // Handle error, set weatherData to null or handle accordingly
        setWeatherData(null);

        if (error.response && error.response.status === 404) {
          setError("City not found. Please enter a valid city name.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    };

    fetchData();
  }, [searchInput]);

  return (
    <>
      <div className="flex gap-10 sm:flex-col sm:gap-12 items-center justify-center bg-ui-purple border-4 border-solid rounded-lg border-card-border p-3 w-auto text-white">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div id="wind" className="flex flex-col gap-4 items-center justify-center">
              <div className="flex gap-1 items-center justify-center">
                <img src="/wind.svg" alt="Wind Icon" />
                <p className="text-white text-sm sm:text-xl sm:font-semibold">Wind</p>
              </div>
              <p className="text-white text-sm sm:text-xl sm:font-semibold">
                {weatherData && weatherData.wind ? `${weatherData.wind.speed} m/s` : 'N/A'}
              </p>
            </div>
            <div id="humidity" className="flex flex-col gap-4 items-center justify-center">
              <div className="flex gap-1 justify-center items-center">
                <img src="/humidity.png" alt="Humidity Icon" />
                <p className="text-white text-sm sm:text-xl sm:font-semibold">Humidity</p>
              </div>
              <p className="text-white text-sm sm:text-xl sm:font-semibold">
                {weatherData && weatherData.main ? `${weatherData.main.humidity}%` : 'N/A'}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
