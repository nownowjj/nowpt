import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CalendarLayout from "../Layout/CalendarLayout";
import {useConfirm} from "../../../hooks/useConfirm";
import {useNavigate} from "react-router-dom";
import MapBox from "./MapBox";
import LevelBoxComponent from "./LevelBoxComponent";
import MapSearchBoxComponent from "./MapSearchBoxComponent";

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
// const [weeklyForecast, setWeeklyForecast] = useState<WeatherData | null>(null);
// const navigate = useNavigate();
//
// // const getWeahter=async (lat:number,lon:number)=>{
// //     const apiKey = "ed2c360f57bf8b6d2532dbf8702ecf49";
// //     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&lang=kr`);
// //     const data = await response.json();
// //     console.log(data);
// //     setWeeklyForecast(data);
// // }


interface Coordinates {
    lat: number;
    lng: number;
}

export interface locationType {
    loaded: boolean;
    position: Coordinates;
}

const MapPage = () => {

    const {confirmFunction , isNotCancelBtn } = useConfirm();


    const [location, setLocation] = useState<locationType>({
        loaded: false,
        position: { lat: 0, lng: 0, }
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onSuccess, onError); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
    }, []);

    // 위경도 추출 성공
    const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
        setLocation({
            loaded: true,
            position: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        })
    }

    // 현재 위치 가져오지 못하면 static 위경도 사용 하도록 하자
    const onError = () => {
        setLocation({
            loaded: false,
            position: {
                lat: 33.450701,
                lng: 126.570667
            }
        });
    };
    const [level, setLevel] = useState(5);

    //--------------------
    //--------------------

    const [Keyword, setKeyword] = useState("");
    const searchCallBack =(searchText:string)=>{
        setKeyword(searchText);
    }


    return (
        <CalendarLayout gnbTitle={"지도"}>
            <MapPageWrap>

                <MapSearchBoxComponent searchCallBack={searchCallBack}/>
                <LevelBoxComponent level={level} setLevel={setLevel} />
                {location.loaded ? <MapBox coordinates={location} level={level} searchKeyword={Keyword}/> : 'Loading...'}
            </MapPageWrap>
        </CalendarLayout>
    );
};

const MapPageWrap = styled.div`
  position: relative;
  background: rgb(249 249 249);
  min-height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
`
export default MapPage;