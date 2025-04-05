
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import { FaMoon, FaSun, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import './App.css';

const API_KEY = "40dc60c346dd5d7801d0b02dc3a5977e";

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [pastSearches, setPastSearches] = useState([]);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
    setPastSearches(savedSearches);
  }, []);

  const updatePastSearches = (newCity) => {
    const updated = [newCity, ...pastSearches.filter((c) => c !== newCity)].slice(0, 5);
    setPastSearches(updated);
    localStorage.setItem('pastSearches', JSON.stringify(updated));
  };

  const removePastSearch = (cityToRemove) => {
    const updated = pastSearches.filter((item) => item !== cityToRemove);
    setPastSearches(updated);
    localStorage.setItem('pastSearches', JSON.stringify(updated));
  };

  const fetchWeatherByCity = async () => {
    if (!city) return;

    try {
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      const dailyForecast = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setWeather(current.data);
      setForecast(dailyForecast);
      updatePastSearches(city);
    } catch (error) {
      console.error("Error fetching weather by city:", error);
      alert("City not found or invalid.");
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const dailyForecast = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setWeather(current.data);
      setForecast(dailyForecast);
    } catch (error) {
      console.error("Error fetching weather by location:", error);
      alert("Failed to fetch weather from location.");
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to access your location.");
      }
    );
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="top-bar">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeatherByCity}>Search</button>
          <button className="location-btn" onClick={handleUseMyLocation}>
            <FaMapMarkerAlt className="theme-toggle-icon" /> 
          </button>
        </div>

        <div className="toggle-section">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun className="theme-toggle-icon" /> : <FaMoon className="theme-toggle-icon" />}
          </button>
        </div>
      </div>

      {pastSearches.length > 0 && (
        <div className="past-searches">
          <h4>Past Searches</h4>
          <div className="search-tags">
            {pastSearches.map((item, index) => (
              <div className="search-tag" key={index}>
                <span onClick={() => { setCity(item); fetchWeatherByCity(); }}>{item}</span>
                <FaTimes className="remove-icon" onClick={() => removePastSearch(item)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!weather && (
        <div className="welcome-message">
          <h2 className="fade-in">Welcome to WeatherNow 🌦️</h2>
          <p className="slide-up">Enter a city or use your location to check the latest weather and 5-day forecast.</p>
        </div>
      )}

      {weather && <WeatherCard data={{ ...weather, pop: forecast[0]?.pop }} />}

      {forecast.length > 0 && (
        <div className="forecast-section">
          {forecast.map((day, index) => (
            <ForecastCard key={index} day={day} />
          ))}
        </div>
      )}

      {/* 🔽 FOOTER ADDED HERE */}
      <footer className="footer">
        <p>Powered by OpenWeatherMap | Designed by Mohammad Raza</p>
      </footer>
    </div>
  );
};

export default App;
