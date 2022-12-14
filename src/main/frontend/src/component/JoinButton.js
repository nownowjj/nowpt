import React from "react";
import styled from "styled-components";

const StButton = styled.button`
    border-radius: 4px;
    background-color: #e8e8e8;
    border: 2px solid #e8e8e8;
    color: black;
    font-weight: bold;
    padding: 10px 6px 10px 6px;
    font-size: 1.1rem;
    margin: 2px;
    cursor: pointer;
    &:hover {
        background-color: #d32f2f;
    }
`;

const Button = (data) => {
    return (
        <StButton
            style={{
                ...data.style,
                ...(data.purpose === "cancel" && {
                    backgroundColor: "white",
                    color: "#ef4746",
                    border: "2px solid #ef4746",
                }),
            }}
            onClick={() => data.onClick()}
        >
            {data.value}
        </StButton>
    );
};
export default Button;
