import React from "react";
import TemperatureDisplay from "./tempdisplay";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiShowers, WiFog } from 'react-icons/wi';

const weatherIcons = {
  Clear: <WiDaySunny />,
  Clouds: <WiCloud />,
  Rain: <WiRain />,
  Snow: <WiSnow />,
  Thunderstorm: <WiThunderstorm />,
  Drizzle: <WiShowers />,
  Fog: <WiFog />,
};

const FiveDayCard = ({ forecastData, loading, error }) => {
  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center bg-ui-purple border-4 border-solid rounded-lg border-card-border p-3 my-4 w-auto text-white overflow-y-auto max-h-80">
        {loading ? (
          <p>Loading...</p>
        ) : (
          Array.isArray(forecastData.list) && forecastData.list.length > 0 ? (
            forecastData.list.map((day, index) => (
              <div key={index} className="flex gap-10 items-center justify-center border-card-border">
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <div className="flex flex-col items-center justify-center gap-2">
                  <TemperatureDisplay temperature={day.main.temp} unit="K" textsize={"sm"} />
                  <p>{day.weather[0].description}</p>
                </div>
                {weatherIcons[day.weather[0].main] || <span>Unknown Icon</span>}
              </div>
            ))
          ) : (
            <p>No forecast data available.</p>
          )
        )}
        {error && <p className="text-white">{error}</p>}
      </div>
    </>
  );
}

export default FiveDayCard;
