import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CalendarLayout from "../Layout/CalendarLayout";

interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}


const WeatherPage = () => {
    const [weeklyForecast, setWeeklyForecast] = useState<WeatherData | null>(null);

    const getWeahter=async (lat:number,lon:number)=>{
        const apiKey = "ed2c360f57bf8b6d2532dbf8702ecf49";
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric&lang=kr`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&lang=kr`);
        // const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`);
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`);
        const data = await response.json();
        console.log(data);
        setWeeklyForecast(data);
    }



    useEffect(() => {

            // 현재 위치로 조회
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                console.log();
                getWeahter(lat,lon)
            });
    }, []);

    return (
        <CalendarLayout gnbTitle={"날씨"}>
            <WeatherPageWrap>
                {weeklyForecast ? (
                    <div>
                        <h2>Weekly Weather Forecast</h2>
                        {/*{weeklyForecast && weeklyForecast.daily.map((day, index) => (*/}
                        {/*    <div key={index}>*/}
                        {/*        <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>*/}
                        {/*        <p>Temperature: {day.temp.day} °C</p>*/}
                        {/*        <p>Description: {day.weather[0].description}</p>*/}
                        {/*        /!* Add more weather details as needed *!/*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

            </WeatherPageWrap>
        </CalendarLayout>
    );
};

const WeatherPageWrap = styled.div`
  position: relative;
  background: rgb(249 249 249);
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 100px;
`
export default WeatherPage;