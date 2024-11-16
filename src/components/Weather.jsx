import React, { useEffect, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import { useState } from 'react'

const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false)

    const allIcons = {
        "01d": clear_icon,
        "01dn": clear_icon,
        "02d": cloud_icon,
        "02dn": cloud_icon,
        "03d": cloud_icon,
        "03dn": cloud_icon,
        "04d": drizzle_icon,
        "04dn": drizzle_icon,
        "09d": rain_icon,
        "09dn": rain_icon,
        "13d": snow_icon,
        "13dn": snow_icon,
    
    
        
    }

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json()
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
                humidity: data.main.humidity,
                temperature: Math.floor(data.main.temp),
                windSpeed: data.wind.speed,
                location: data.name,
                icon: icon
            })
            
        } catch (error) {
            
        }
    }
    useEffect(() => {
        search("New york")
    }, [])


  return (
    <div className='weather'>
        <div className='search-bar'>
          <input ref={inputRef} className='input-box' type="text" placeholder='Search' />
          <img src={search_icon} alt=""  onClick={() => search(inputRef.current.value)}/>
        </div>
        <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed}</p>
                    <span>Wind Speed</span>
                </div>
                
            </div>
            </div> 
        </div>
  )
}


export default Weather
