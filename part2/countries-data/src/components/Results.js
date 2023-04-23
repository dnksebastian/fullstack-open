import CountryDetails from "./CountryDetails";

const Results = ({ countries, showDetails, getWeather, weatherData }) => {

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } 
  else if (countries.length === 1) {
    return <CountryDetails country={countries} getWeather={getWeather} weatherData={weatherData} />
  } 
  else if (countries.length > 1) {
    return (
      <div>
        <ul className="country-result-list">
          {countries.map((country) => (
            <li key={country.area}>{country.name.common} <button className="res-btn" onClick={() => {showDetails(country.area)}}>show</button></li>
          ))}
        </ul>
      </div>
    );
  } 
  else {
    return <p>Enter your query to the input above to find countries!</p>
  }
};

export default Results;
