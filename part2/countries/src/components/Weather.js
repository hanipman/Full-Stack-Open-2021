import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [ weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [api_key, country])
    
    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <b>temperature: </b> {weather.temperature} Celsius<br/>
            <img src={weather.weather_icons} alt="weather_icon" /><br />
            <b>wind: </b>{weather.wind_speed} kmph direction {weather.wind_dir}
        </div>
    )
}

export default Weather;