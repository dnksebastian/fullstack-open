import { useState, useEffect } from 'react'
import countriesHandlers from './services/countries';

// Component imports
import FindCountriesForm from './components/FindCountriesForm';
import Results from './components/Results';

// App
const App = () => {

  const [countryQuery, setCountryQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [matchingCountries, setMatchingCountries] = useState([]);
  const [weather, setWeather] = useState({});

  const handleCountryChange = (e) => {
    setCountryQuery(e.target.value);
    findCountries();
  }
  
  const receiveCountries = () => {
    countriesHandlers.getAll().then((receivedCountries) => {
      setCountries([...receivedCountries])
    });
  }
  useEffect(receiveCountries, [])


  const findCountries = () => {
    const foundCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryQuery.toLowerCase()))

    setMatchingCountries([...foundCountries])
  }

  const showDetails = (id) => {
    const countryToShow = countries.find(country => country.area === id)

    setMatchingCountries([{...countryToShow}]);
  } 

  const getWeather = async (lat, lang) => {
    const weatherRes = await countriesHandlers.getWeather(lat, lang)
    const weatherObj = weatherRes.daily;

    setWeather(weatherObj)
  }


  return (
    <div className='main-wrapper'>
      <FindCountriesForm country={countryQuery} countryHandler={handleCountryChange}/>
      <Results countries={matchingCountries} showDetails={showDetails} getWeather={getWeather} weatherData={weather}/>
    </div>
  );
}

export default App;
