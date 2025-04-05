// import React from 'react';

// const WeatherCard = ({ data }) => {
//   return (
//     <div className="weather-card">
//       <h2>{data.name}</h2>
//       <p>{data.weather[0].main}</p>
//       <h1>{Math.round(data.main.temp)}°C</h1>
//       <p>Humidity: {data.main.humidity}%</p>
//       <p>Wind: {data.wind.speed} m/s</p>
//     </div>
//   );
// };

// export default WeatherCard;



// import React from "react";
// import "./App.css";

// const WeatherCard = ({ data }) => {
//   if (!data || !data.main || !data.weather || data.weather.length === 0) return null;

//   const { name, main, weather, wind, sys } = data;

//   const toFahrenheit = (celsius) => ((celsius * 9) / 5 + 32).toFixed(1);

//   return (
//     <div className="weather-card">
//       <h2>{name}, {sys?.country}</h2>

//       <div className="temp">
//         {main.temp.toFixed(1)}°C / {toFahrenheit(main.temp)}°F
//       </div>

//       <div className="description">{weather[0].description}</div>

//       <div className="extras">
//         <p><strong>Feels like:</strong> {main.feels_like}°C / {toFahrenheit(main.feels_like)}°F</p>
//         <p><strong>Humidity:</strong> {main.humidity}%</p>
//         <p><strong>Pressure:</strong> {main.pressure} hPa</p>
//         <p><strong>Wind:</strong> {wind.speed} m/s</p>
//         <p><strong>Rain Chance:</strong> {(data.pop || 0) * 100}%</p>
//       </div>
//     </div>
//   );
// };

// export default WeatherCard;


import React from 'react';

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />

      <div className="temp">{Math.round(data.main.temp)}°C</div>
      <p>{data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>

      {/* POP (Rain Prediction) */}
      {typeof data.pop === 'number' && (
        <p>🌧️ Rain Chance: {Math.round(data.pop * 100)}%</p>
      )}
    </div>
  );
};

export default WeatherCard;



