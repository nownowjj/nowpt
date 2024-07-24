import { useEffect } from "react";
import {locationType} from "./MapPage";

declare global {
    interface Window {
        kakao: any;
    }
}

interface MapBoxProps {
    coordinates :locationType
    level:number;
}

const MapBox = ({ coordinates,level }: MapBoxProps) => {

    // 내 위치 마커 찍기
    const setMyPositionMarker=(map:any)=>{
        if(coordinates.loaded){
            const myMarker = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
                  myMarkerSize = new window.kakao.maps.Size(30, 30),
                  myMarkerOption = { offset: new window.kakao.maps.Point(0, 0) };

            const myMarkerPosition = new window.kakao.maps.MarkerImage(
                myMarker,
                myMarkerSize,
                myMarkerOption
            );

            const myPosition = new window.kakao.maps.LatLng(
                coordinates.position.lat,
                coordinates.position.lng
            );
            const marker = new window.kakao.maps.Marker({
                map: map,
                image: myMarkerPosition,
                position: myPosition,
            });
        }
    }

    useEffect(() => {
        kakao.maps.load(() => {
            const container = document.getElementById('map') as HTMLElement;
            const options = {
                center: new kakao.maps.LatLng(coordinates.position.lat, coordinates.position.lng),
                level: level,
                // draggable:false // 지도 이동 및 확대/축소 방지
            };
            const map = new kakao.maps.Map(container, options);
            // map.setZoomable(false); // 마우스 휠로 지도 확대,축소 가능여부

            setMyPositionMarker(map);
        });
    }, [level])

    return (
        <div style={{width:"100%",height:"calc(100vh - 100px)"}}>
            <div id="map" style={{ width: "100%", height: "100%" }} ></div>
        </div>
    );
};

export default MapBox;
