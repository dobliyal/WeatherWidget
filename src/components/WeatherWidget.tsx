import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Typography, Button } from '@mui/material';
import CitySelector from './CitySelector';
import { citiesData } from '../Data/data';
interface WeatherData {
  temperature: {
      min: number;
      max: number;
  };
}

const WeatherWidget: React.FC = ()=> {
    const [city, setCity] = useState<string>(() => localStorage.getItem('city') || 'Delhi');
    const [weatherData, setWeatherData] = useState<any>(null);

    const fetchWeatherData = useCallback(async () => {
        const selectedCity = citiesData.find(c => c.city === city);
        if (!selectedCity) return;

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lng}&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto`);
        const data = await response.json();
       // console.log(data)

        setWeatherData({
            temperature: {
                min: data.daily?.temperature_2m_min[0],
                max: data.daily?.temperature_2m_max[0],
            }
        });
    }, [city]);

    useEffect(() => {
        const intervalId = setInterval(fetchWeatherData, 600000); 
        return () => clearInterval(intervalId);
    }, []);

    const averageTemp = useMemo(() => {
        if (!weatherData) return null;
        const { min, max } = weatherData.temperature;
        return (min + max) / 2;
    }, [weatherData]);

    useEffect(() => {
        localStorage.setItem('city', city);
    }, [city]);

    return (
        <Container>
            <Typography variant="h4">Weather Widget</Typography>
            <CitySelector city={city} setCity={setCity} />
            <Button variant="contained" onClick={fetchWeatherData}>Submit</Button>
            {weatherData && (
                <>
                    <Typography variant="h6">Current Weather for {city}</Typography>
                    <Typography>Min Temp: {weatherData.temperature.min}°C</Typography>
                    <Typography>Max Temp: {weatherData.temperature.max}°C</Typography>
                    <Typography>Average Temp: {averageTemp}°C</Typography>
                </>
            )}
        </Container>
    );
};

export default WeatherWidget;
