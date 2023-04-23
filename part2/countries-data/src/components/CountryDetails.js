import { useEffect } from "react";
import WeatherIcons from "../assets/weather-icons/icons";

const CountryDetails = ({ country, getWeather, weatherData }) => {
    const finalCountry = { ...country[0] };
    const lat = finalCountry.latlng[0];
    const lng = finalCountry.latlng[1];
    
    console.log('rendered');
    
    useEffect(() => {
    getWeather(lat, lng);
  }, [getWeather, lat, lng]);


//   Providing icons this way because the weather API doesn't have this feature ;)

  const renderWeatherIcon = (code) => {
    if (code === 0) {
      return WeatherIcons.clearDayIcon
    } else if (code < 40) {
      return WeatherIcons.cloudyIcon;
    } else if (code >= 40 && code < 50) {
      return WeatherIcons.fogIcon;
    } else if (code >= 50 && code < 60) {
      return WeatherIcons.drizzleIcon;
    } else if (code >= 60 && code < 70) {
      return WeatherIcons.rainIcon;
    } else if (code >= 70 && code < 80) {
      return WeatherIcons.snowIcon;
    } else if (code >= 80 && code < 85) {
      return WeatherIcons.rainIcon;
    } else if (code >= 85 && code < 90) {
      return WeatherIcons.snowIcon;
    } else if (code >= 90 && code <= 100) {
      return WeatherIcons.thunderstormIcon;
    } else {
      return WeatherIcons.notAvailableIcon
    }
  };


  return (
    <div className="country-details">
      <h2 className="c-name">{finalCountry.name.common}</h2>
      <div className="basic-info">
        <p>Capital: {finalCountry.capital[0]}</p>
        <p>Area: {finalCountry.area}</p>
      </div>
      <h3>Languages:</h3>
      <ul className="lang-list">
        {Object.entries(finalCountry.languages).map(([shortname, longname]) => (
          <li key={shortname}>{longname}</li>
        ))}
      </ul>
      <h3 className="flag-label">Flag:</h3>
      <div className="flag-wrap">
        <img src={finalCountry.flags.png} alt={finalCountry.flags.alt} />
      </div>
      <h3>Weather in {finalCountry.capital[0]}</h3>
      <div className="weather-container">
        <p>temperature: {weatherData.temperature_2m_max} °C</p>
        <div className="weather-icon-wrap">
            {weatherData.weathercode &&
          <img alt="weather icon" src={renderWeatherIcon(weatherData.weathercode[0])}></img> }
        </div>
        <p>wind: {weatherData.windspeed_10m_max} m/s</p>
        <p className="attribution">Country data by <a href="https://restcountries.com/">REST Countries</a>. Weather data by <a href="https://open-meteo.com/">Open-Meteo.com</a>. Weather icons by <a href="https://bas.dev/work/meteocons">Meteocons</a>.</p>
      </div>
    </div>
  );

};

export default CountryDetails;
