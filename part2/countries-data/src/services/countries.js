import axios from 'axios';


const url = 'https://restcountries.com/v3.1/all';


const getWeather = (lat, lang) => {
    // const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lang}&daily=weathercode,temperature_2m_max,windspeed_10m_max&timezone=auto`
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lang}&daily=weathercode,temperature_2m_max,windspeed_10m_max&windspeed_unit=ms&forecast_days=1&timezone=auto`

    const req = axios.get(weatherUrl);
    return req.then(res => res.data);
};




const getAll = () => {
    const req = axios.get(url);
    return req.then(res => res.data)
}


const countriesHandlers = {
    getAll,
    getWeather
}

export default countriesHandlers;