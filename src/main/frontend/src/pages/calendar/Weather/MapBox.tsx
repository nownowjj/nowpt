import React, {useEffect, useState} from "react";
import {locationType} from "./MapPage";
import MapSearchResultComponent from "./MapSearchResultComponent";
import {markerImgSrc, SearchResultData, SearchResultPagination, SearchResultStatus} from "./map";
import styled from "styled-components";
import ReactDOMServer from 'react-dom/server';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store/store";

interface MarkerInfoProps {
    title: string;
}
const MarkerInfo =({title}:MarkerInfoProps)=>{
    return(
        <MarkerInfoWrap>{title}</MarkerInfoWrap>
    )
}
const MarkerInfoWrap = styled.div`
  //width: 100%;
  white-space: nowrap;
  background: black;
  color: #fff;
  padding: 10px;
  height: 100%;
  text-align: center;
`

interface placeType {
    place_name: string,
    road_address_name: string,
    address_name: string,
    phone: string,
    place_url: string
}

declare global {
    interface Window {
        kakao: any;
    }
}

interface MapBoxProps {
    coordinates :locationType
    level:number;
    searchKeyword: string; //검색어
}
const { kakao } = window as any;

export interface SearchResultProps {
    data: SearchResultData[];
    status:SearchResultStatus;
    pagination:SearchResultPagination
}

const MapBox = ({ coordinates,level,searchKeyword }: MapBoxProps) => {


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
    // 마커를 담는 배열
    let markers: any[] = [];


    const {lat,lng}  = useSelector((state: RootState) => state.map.coordinate);
    const [searchResults,setSearchResults]=useState<SearchResultProps| null>(null);

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
            //-----------------------------------------------------------------
            //-----------------------------------------------------------------

            const ps = new kakao.maps.services.Places(); // 장소 검색 객체
            const infowindow = new kakao.maps.InfoWindow({zIndex:1}); //검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우

            if(searchKeyword !== ""){
                ps.keywordSearch(searchKeyword, searchCallBack);
            }

            function searchCallBack(data: SearchResultData[], status: SearchResultStatus, pagination: SearchResultPagination) {
                console.log(data,status,pagination);
                setSearchResults({ data, status, pagination });

                removeMarker();
                for ( var i=0; i<data.length; i++ ) {
                    let placePosition = new kakao.maps.LatLng(data[i].y, data[i].x),
                        marker = addMarker(placePosition, i, undefined);
                    if(i==0) moveMapCenter(placePosition);

                    (function(marker, title) {
                        kakao.maps.event.addListener(marker, 'mouseover', function() {
                            displayInfowindow(marker, title);
                        });
                        kakao.maps.event.addListener(marker, 'mouseout', function() {
                            infowindow.close();
                        });
                    })(marker, data[i].place_name);

                }
            }

            // 중심 좌표 이동
            function moveMapCenter(placePosition:any){
                if(lat !== "" && lng !== ""){
                    console.log(lat,lng);
                    console.log("선택 장소 이동");
                    map.setCenter(new kakao.maps.LatLng(lat, lng))
                }else {
                    console.log("첫번째 장소 이동");
                    map.setCenter(placePosition)
                }
            }


            // 마커를 생성하고 지도 위에 마커를 표시하는 함수
            function addMarker(position: any, idx: number, title: undefined) {
                var imageSrc = markerImgSrc, // 마커 이미지 url, 스프라이트 이미지
                    imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                    imgOptions =  {
                        spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                        spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                        offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                    },
                    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                    marker = new kakao.maps.Marker({
                        position: position, // 마커의 위치
                        image: markerImage
                    });

                marker.setMap(map); // 지도 위에 마커를 표출
                markers.push(marker);  // 배열에 생성된 마커를 추가

                return marker;
            }

            // 지도 위에 표시되고 있는 마커를 모두 제거합니다
            function removeMarker() {
                for ( var i = 0; i < markers.length; i++ ) {
                    markers[i].setMap(null);
                }
                markers = [];
            }



            function displayInfowindow(marker: any, title: string) {
                const content = ReactDOMServer.renderToString(<MarkerInfo title={title} />);
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }

        });
    }, [level,searchKeyword,lat])

    const [open,setOpen] = useState(false);

    return (
        <React.Fragment>
            <div style={{width:"100%",height:"calc(100vh - 100px)"}}>
                <div id="map" style={{ width: "100%", height: "100%" }} ></div>
            </div>

            <MapResultToggle>
                {open ?
                <span onClick={()=>setOpen(false)}>닫기</span> :
                <span onClick={()=>setOpen(true)}>열기</span>
            }</MapResultToggle>
            {open && <MapSearchResultComponent searchKeyword={searchKeyword} searchResults={searchResults}/>}
        </React.Fragment>
    );
};

const MapResultToggle = styled.div`
  position: absolute;
  z-index: 100;
  top: 13px;
  right: 43px;
`

export default MapBox;
