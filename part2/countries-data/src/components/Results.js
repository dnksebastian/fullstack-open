import CountryDetails from "./CountryDetails";

const Results = ({ countries, showDetails, getWeather, weatherData }) => {
  // console.log(countries);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <div>
        <ul>
          {countries.map((country) => (
            <li key={country.area}>{country.name.common} <button onClick={() => {showDetails(country.area)}}>show</button></li>
          ))}
        </ul>
      </div>
    );
  } else if (countries.length === 1) {
    return <CountryDetails country={countries} getWeather={getWeather} weatherData={weatherData} />
  } 
  else {
    return <p>Results...</p>
  }
};

export default Results;
