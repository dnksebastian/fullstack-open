import CountryDetails from "./CountryDetails";

const Results = ({ countries }) => {
  console.log(countries);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return (
      <div>
        <ul>
          {countries.map((country) => (
            <li key={country.area}>{country.name.common}</li>
          ))}
        </ul>
      </div>
    );
  } else if (countries.length === 1) {
    return <CountryDetails country={countries} />
  } 
  else {
    return <p>Results...</p>
  }
};

export default Results;
