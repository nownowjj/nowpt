import React from 'react';
import styled from "styled-components";

const ApiLoadingComponent = () => {
    return (
        <ApiLoading id={"dim"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200"
                 style={{
                     shapeRendering: 'auto', display: 'block',zIndex:'1002',position:'relative'
                 }}>
                <g>
                    <circle strokeLinecap="round" fill="none" strokeDasharray="50.26548245743669 50.26548245743669" stroke="#e15b64" strokeWidth="8" r="32" cy="50" cx="50">
                        <animateTransform values="0 50 50;360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1s" type="rotate" attributeName="transform"></animateTransform>
                    </circle>
                    <circle strokeLinecap="round" fill="none" strokeDashoffset="36.12831551628262" strokeDasharray="36.12831551628262 36.12831551628262" stroke="#f8b26a" strokeWidth="8" r="23" cy="50" cx="50">
                        <animateTransform values="0 50 50;-360 50 50" keyTimes="0;1" repeatCount="indefinite" dur="1s" type="rotate" attributeName="transform"></animateTransform>
                    </circle>
                </g>
            </svg>
        </ApiLoading>
    );
};

const ApiLoading = styled.div`
  width: 100vw;
  height: 100vh;
  //background: black;
  background: rgba(0, 0, 0, .6);
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &.dimOn {
    visibility: visible;
    opacity: 1;
  }
`

export default ApiLoadingComponent;