import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)    
    const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/name'

    useEffect(() => {
      async function fetchCountryData () {
        try {
          const res = await axios.get(`${baseURL}/${name}`)
          const countryData = {
            found: 1,
            data: {
              name: res.data.name.common,
              capital:res.data.capital[0],
              population:res.data.population,
              flag:res.data.flags.png, 
            }
          }
          setCountry(countryData)
        } catch (err) {
          setCountry({found: 0})
        }
      }
      if(name) {
        fetchCountryData()
      }
    }, [name])

  return country
}