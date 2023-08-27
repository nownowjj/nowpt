import React from "react";
import styled from "styled-components";

const StInput = styled.input`
    border-radius: 4px;
    border: 2px solid #e8e8e8;
    padding: 10px;
    font-size: 1rem;
    margin: 2px;
    &:focus {
        border: 2px solid black;
        outline: none;
    }
    ::placeholder {
        font-size: 0.8rem;
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
}
`;

const Input = (data) => {
    return (
        <StInput
            placeholder={data.placeholder}
            type={data.type}
            value={data.value}
            // autoComplete={data.autoComplete}
            style={data.style}
            // onKeyPress={() => data.on    KeyPress && data.onKeyPress()}
            onChange={(e) => data.onChange && data.onChange(e.target.value)}
        />
    );
};
export default Input;
