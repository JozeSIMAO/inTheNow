import React, { useEffect, useState } from 'react';
import DisplayWeather from './DisplayWeather';
import axios from 'axios';
import weather_bg from './assets/weather_bg.jpg';

function Weather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('')

    useEffect(() => {
        console.log('Effect executed');
        const fetchWeather = async () => {
            try {
                if (!city) {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
                    setWeather(response.data);
                    setLoading(false);
                }
                else {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);
                    setWeather(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('API Error:', error);
                setError(error);
                setLoading(false);
            }
        };
    
        fetchWeather();
    }, [city]);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !weather) {
        return <div>Error: {error ? error.message : 'Weather data not available'}</div>;
    }

    return (
        <div style={{backgroundImage: `url(${weather_bg})`, backgroundSize: 'cover', minHeight: '100vh'}}>
            <DisplayWeather weather={weather} setCity={setCity}/>
        </div>
    );
}

export default Weather;
