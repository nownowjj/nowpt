import React from "react";
import { MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import {markerdata} from "./markerdata";

const Overlay = styled(Box)(() => ({
    padding: "4px",
    backgroundColor: "#ff6a32",
    color: "white",
    fontWeight: "bold",
    "&::before": {
        content: '" "',
        display: "inline-block",
        transform: "rotate(180deg)",
        position: "absolute",
        borderBottom: "10px solid #ff6a32",
        borderLeft: "8px solid transparent",
        borderRight: "8px solid transparent",
        top: "28px",
        left: "25px"
    }
}));

const KakaoMap = () => {

    console.log("맵!")
    return (
        <Map center={{ lat: 37.365264512305174, lng: 127.10676860117488 }} style={{ width: "600px", height: "600px" }} level={10}>
            {markerdata.map(position =>
                <>
                    <MapMarker
                        key={position.title}
                        position={{ lat: position.lat, lng: position.lng }}
                        image={{
                            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                            size: {
                                widht: 24,
                                height: 35
                            } // 마커이미지의 크기입니다
                        }}
                        title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    />

                    {/*<CustomOverlayMap position={{ lat: position.lat + 0.45, lng: position.lng + 0.1 }}>*/}
                    {/*    <Overlay>{position.title}</Overlay>*/}
                    {/*</CustomOverlayMap>*/}
                </>
            )}
        </Map>
    );
};

export default KakaoMap;