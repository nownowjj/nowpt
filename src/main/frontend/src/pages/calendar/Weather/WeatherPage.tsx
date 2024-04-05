import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import TopGnbComponent from "../TopGnb/TopGnbComponent";
import {setMemoLists} from "../../../redux/slice/memoSlice";
import CalendarBottomMenu from "../Bottom/CalendarBottomMenu";

const WeatherPage = () => {
    const [apiMode , setApiMode] = useState<string>("");
    const [cityName , setCityName] = useState<string>("seoul");
    const [weatherData , setWeatherData] = useState({});
    const [imgSrc, setImg] = useState<string>("dd");


    const getWeatherMyPosition = async(lat:number, lon:number) => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
            let url  = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`; // 위,경도 API 호출 URL
            let response = await fetch(url);

            return await response.json();
    };
    const getWeatherCityName = async(cityName:string) => {
        console.log(cityName + "지역명 조회");
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        let url  = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`; // 위,경도 API 호출 URL
        let response = await fetch(url);

        return await response.json();
    };

    const callCityWeather=(cityName:string)=>{
        getWeatherCityName(cityName)
            .then(r =>{
                console.log(`getWeatherCityName : ${JSON.stringify(r)}`);
                console.log(r.weather[0].icon)
                setImg(r.weather[0].icon);
            }).catch(e =>{
                console.log(e);
        })
    }

    useEffect(() => {
        console.log('발동');
        if (apiMode === "position"){
            // 현재 위치로 조회
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                getWeatherMyPosition(lat, lon).then(r => {
                    console.log('위치모드');
                    console.log(r)
                    console.log(r.weather[0].icon)
                    setImg(r.weather[0].icon);
                });
            });
        }
        // else if(apiMode === "city"){
        //     getWeatherCityName(cityName)
        //         .then(response =>{
        //             console.log('지역모드');
        //             console.log(response);
        //         })
        // }
        else{
            console.log('모드선택 필요');
        }

    }, [apiMode]);
    const imgsSrc = `http://openweathermap.com/img/w/${imgSrc}.png`;

    const onChange =(e:React.ChangeEvent<HTMLInputElement>) => {
        setCityName(e.target.value);
    }
    return (
        <WeatherPageWrap>
            <TopGnbComponent page={'날씨'}/>

            <div onClick={()=> setApiMode("position")}>현재 위치로 조회</div>
            <br/>
            <button onClick={()=>callCityWeather(cityName)}>지역명으로 조회</button>
            <input name="cityName" onChange={onChange} value={cityName}/>
            <img src={imgsSrc} alt='dsadas'/>

            <CalendarBottomMenu/>
        </WeatherPageWrap>
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