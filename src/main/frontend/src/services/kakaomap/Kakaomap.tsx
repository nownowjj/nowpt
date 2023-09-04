import React from "react";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {markerdata} from "./markerdata";


const KakaoMap = () => {

    console.log("맵!")
    return (
        <Map center={{ lat: 37.365264512305174, lng: 127.10676860117488 }} style={{ width: "600px", height: "600px" }} level={10}>
            {/*{markerdata.map((position,index : position.index) =>*/}
            {markerdata.map((position,index) =>
                <div  key ={index}>
                    <MapMarker
                        key={index}
                        position={{ lat: position.lat, lng: position.lng }}
                        // image={{
                        //     src: {"https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"},
                        //     size: {
                        //         widht: 24,
                        //         height: 35
                        //     }
                        // }}
                        title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    />
                </div>
            )}
        </Map>
    );
};

export default KakaoMap;