import React, { useState, useEffect } from 'react';
import SearchBar from './components/searchbar';
import MainInfoCard from './components/mainInfo';
import AdditionalInfoCard from './components/additionalInfoCard';
import FiveDayCard from './components/fiveDayCard';
import axios from 'axios';
import ToggleButton from './components/toggleButton';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("C");
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const apiHost = process.env.REACT_APP_RAPIDAPI_HOST;

  const handleSearch = async (input) => {
    setSearchInput(input);

    // Fetch city data to get coordinates
    const cityOptions = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/city/${input}`,
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    };

    try {
      const cityResponse = await axios.request(cityOptions);
      const { coord } = cityResponse.data;
      setCoordinates({ lat: coord.lat, lon: coord.lon });
    } catch (cityError) {
      console.error(cityError);
      // Handle error if needed
    }
  };

  useEffect(() => {
    const fetchFiveDayForecast = async () => {
      setError(null);
      setLoading(true);

      
        const options = {
          method: 'GET',
          url: 'https://open-weather13.p.rapidapi.com/city/fivedaysforcast/18.5196/73.8553',
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost,
          }
        };

        try {
          const response = await axios.request(options);
          setFiveDayForecast(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
          setError("An error occurred while fetching the 5-day forecast.");
        } finally {
          setLoading(false);
        }
      
    };

    fetchFiveDayForecast();
  }, [coordinates]);

  const handleToggle = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className='sm:flex sm:items-center sm:justify-center sm:my-5 sm:gap-10'>
        <MainInfoCard searchInput={searchInput} temperatureUnit={temperatureUnit} />
        <ToggleButton onToggle={handleToggle}/>
        <AdditionalInfoCard searchInput={searchInput} />
        <FiveDayCard forecastData={fiveDayForecast} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
