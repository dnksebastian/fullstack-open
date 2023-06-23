import { useState, useEffect, useCallback } from 'react'
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

  const receiveCountries = () => {
    countriesHandlers.getAll().then((receivedCountries) => {
      setCountries([...receivedCountries])
    });
  }
  
  useEffect(receiveCountries, [])


  const handleCountryChange = (e) => {
    setCountryQuery(e.target.value);
  }

  const findCountries = useCallback(() => {
    if(countryQuery) {
      const foundCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryQuery.toLowerCase()))
      setMatchingCountries([...foundCountries])    
    } else if (!countryQuery) {
      setMatchingCountries([])
    }
  }, [countryQuery, countries])


  useEffect(() => {
    findCountries()
  }, [countryQuery, findCountries])

  const showDetails = (id) => {
    const countryToShow = countries.find(country => country.area === id)
    setMatchingCountries([{...countryToShow}]);
  } 

  const weatherFetch = useCallback( async (lat, lng) => {
    const weatherRes = await countriesHandlers.getWeather(lat, lng)
    const weatherObj = weatherRes.daily;
    setWeather(weatherObj)
  }, [])

  return (
    <div className='main-wrapper'>
      <FindCountriesForm country={countryQuery} countryHandler={handleCountryChange}/>
      <Results countries={matchingCountries} showDetails={showDetails} getWeather={weatherFetch} weatherData={weather}/>
    </div>
  );
}

export default App;
