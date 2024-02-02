import React from 'react';

export default function TemperatureDisplay  ({ temperature, unit,textsize }) {
  
    const displayTemperature = () => {
    return `${temperature}°${unit}`;
  };

  return (
    <div>
      <p className={`text-${textsize}`}>{displayTemperature()}</p>
    </div>
  );
};

