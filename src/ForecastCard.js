// import React from 'react';

// const ForecastCard = ({ day }) => {
//   const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
//     weekday: 'short',
//     month: 'short',
//     day: 'numeric',
//   });

//   return (
//     <div className="forecast-card">
//       <h4>{date}</h4>
//       <img
//         src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//         alt={day.weather[0].description}
//       />
//       <p>{day.weather[0].description}</p>
//       <p>Temp: {Math.round(day.main.temp)}°C</p>
//     </div>
//   );
// };

// export default ForecastCard;

import React, { useState } from 'react';


const ForecastCard = ({ day }) => {
  const [toggled, setToggled] = useState(false);

  const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const toggleCard = () => {
    setToggled(!toggled);
  };

  return (
    <div
      className={`forecast-card ${toggled ? 'toggled' : ''}`}
      onClick={toggleCard}
    >
      <h4 className="forecast-date">{date}</h4>
      <img
        className="forecast-icon"
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt={day.weather[0].description}
      />
      <p className="forecast-desc">{day.weather[0].description}</p>
      <p className="forecast-temp">Temp: {Math.round(day.main.temp)}°C</p>
    </div>
  );
};

export default ForecastCard;
