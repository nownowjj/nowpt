import React from 'react';
import styled, {keyframes} from "styled-components";

interface LoadingDotProps {
    loop?:number;
    size:number;
    delay?:boolean;
}

/**
 *
 * @param loop default= 3 보여줄 Dot의 개수
 * @param size Dot size
 * @param delay
 * @constructor
 */
const LoadingDotComponent = ({loop=3 , size , delay=false}:LoadingDotProps) => {
    return (
        <DotWrap>
            {[...Array(loop)].map((_, index) => (
                <LoadingDot
                    style={delay ? { animationDelay: `0.${index + 1}s` } : {animationDelay: `0.5s`}}
                    key={index}
                    size={size}
                />
            ))}
        </DotWrap>
    );
};

const loading = keyframes`
  0% {
    transform: scale(0);
  } 50% {
      transform: scale(1.0);
    } 100% {
        transform: scale(0);
      }
`;
const DotWrap = styled.div`
      height: 20px;
`
const LoadingDot = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: #e8e8e8;
  border-radius: 100%;
  display: inline-block;
  animation: ${loading} 1.5s infinite ease-in-out both;
  margin-right: 2px;
`;

export default LoadingDotComponent;