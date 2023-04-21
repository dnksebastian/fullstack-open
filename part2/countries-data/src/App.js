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

  // useEffect(() => console.log(countryQuery), [countryQuery]);
  
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
    // console.log(foundCountries);
  }


  return (
    <div className='main-wrapper'>
      <FindCountriesForm country={countryQuery} countryHandler={handleCountryChange}/>
      <Results countries={matchingCountries} />
    </div>
  );
}

export default App;
