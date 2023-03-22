import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const defaultResponse = fetch(`https://api.openweathermap.org/data/2.5/weather?q=Manila&units=metric&appid=627eb2c1173e422b3fedde248840983d`);
    defaultResponse
      .then((response) => response.json())
      .then((responseData) => {
        setWeatherData(responseData);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=627eb2c1173e422b3fedde248840983d`);
    response
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.cod === "404") {
          setWeatherData({ error: "No city found" });
        } else {
          setWeatherData(responseData);
        }
      });
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='search location' onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {weatherData.name && (
        <div>
          <h1>{weatherData.name}</h1>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
      {weatherData.error && (
        <div>
          <p>{weatherData.error}</p>
        </div>
      )}
    </div>
  );
}

export default App;