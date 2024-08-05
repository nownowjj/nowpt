import React from 'react';
import styled from "styled-components";
import {SearchResultData} from "./map";
import {useDispatch} from "react-redux";
import {setCoordinate} from "../../../redux/slice/mapSlice";


interface SearchItemProps {
    data : SearchResultData;
    index:number;
}
// place_url
// x ,
// y
const SearchItemComponent = ({data,index}:SearchItemProps) => {
    const dispatch = useDispatch();

    return (
        <SearchItem>
            <PlaceName>
                <Marker
                    onClick={
                        ()=> dispatch(setCoordinate({lat:data.y, lng:data.x}))
                    }>{index}
                </Marker>
                <PlaceNameSub target={"_blank"} href={`${data.place_url}`}>{data.place_name}</PlaceNameSub>
                <CategoryGroupName>{data.category_group_name}</CategoryGroupName>
            </PlaceName>
            <AddressName>{data.address_name}</AddressName>
            {data.road_address_name && <RoadAddressName><RoadBtn>지번</RoadBtn> {data.road_address_name}</RoadAddressName>}
            <Tel href={`tel"${data.phone}`}>{data.phone}</Tel>
        </SearchItem>
    );
};

const PlaceNameSub = styled.a`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 75%;
`
const Marker = styled.span`
    border: 1px solid black;
    background: #2a87d0;
    color: #fff;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 12px;
`
// markerImgSrc
const SearchItem = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e8e8e8;
  padding: 5px 10px;
`
const PlaceName = styled.strong`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 5px;
`
const CategoryGroupName = styled.span`
  white-space: nowrap;
  font-weight: 400;
  font-size: 13px;
  color: #999;
  padding-left: 5px;
`
const AddressName = styled.p`
  font-size: 13.5px;
`
const RoadAddressName = styled.p`
  font-size: 12px;
  color: #999;
`
const RoadBtn = styled.button`
  background: #e8e8e8;
  color: #999;
  border: 1px solid #ddd;
  font-size: inherit;
`
const Tel = styled.a`
  font-size: 13px;
`
export default SearchItemComponent;