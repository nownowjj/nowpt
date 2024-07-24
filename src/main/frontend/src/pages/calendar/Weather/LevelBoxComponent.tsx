import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {TbMapPinUp} from "react-icons/tb";
import {current} from "immer";

interface LevelBoxComponentProps {
    level:number;
    setLevel: (level: number) => void;
}
const LevelBoxComponent = ({level ,setLevel}:LevelBoxComponentProps) => {
    const [view,setView] = useState<boolean>(false);
    const handleLevelClick = (level: number) => {
        setLevel(level);
        setView(false); // 레벨 클릭하면 view 닫기
    };

    return (
        <LevelBox onClick={()=>setView(!view)}>
            <StyledTbMapPinUp/>
            {view &&
                <LevelList>
                    {Array.from({ length: 13 }, (_, index) => (
                        <Level
                            onClick={()=>handleLevelClick(index+1)}
                            key={index + 1}
                            className={level === index + 1 ? 'selected' : ''}
                        >{index + 1}</Level>
                    ))}
                </LevelList>

            }
        </LevelBox>
    );
};
const Level = styled.li`
  width: 100%;
  
  &.selected{
    background: skyblue;
    color: #fff;
  }
`

const LevelList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 30px;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow:hidden;
`;

const LevelBox = styled.div`
  position: absolute;
  top: 55px;
  right: 5px;
  z-index: 10;
  background: #fff;
  border-radius: 50%;
  border:1px solid #e8e8e8;
  text-align: center;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledTbMapPinUp = styled(TbMapPinUp)`
    width: 25px;
    height: 25px;
`

export default LevelBoxComponent;